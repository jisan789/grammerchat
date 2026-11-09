"""
Grammar & Spell Checking Engine for LiveChat
Powered by Groq Cloud AI (openai/gpt-oss-120b) with tailored JSON schema,
plus resilient Web API fallback.
"""

import os
import re
import json
import logging
from typing import Dict, Any, List, Optional
import httpx
from app.config import GROQ_API_KEY, GROQ_MODEL

logger = logging.getLogger("livechat.grammar")

# In-memory cache for grammar checks: {text_hash: result_dict}
_GRAMMAR_CACHE: Dict[str, Dict[str, Any]] = {}
_CACHE_MAX_SIZE = 500

# Try initializing Groq client
_groq_client = None
if GROQ_API_KEY:
    try:
        from groq import Groq
        _groq_client = Groq(api_key=GROQ_API_KEY)
    except Exception as exc:
        logger.warning(f"[Grammar] Could not initialize Groq SDK client: {exc}")


GROQ_SYSTEM_INSTRUCTION = """You are an expert English grammar, spelling, and phrasing tutor.
Analyze the user's input text and respond ONLY with a valid JSON object matching the schema below.
No conversational intro or outro, no markdown fences, only pure JSON.

JSON Schema:
{
  "has_mistakes": boolean,
  "original": "exact original text",
  "corrected": "complete naturally corrected text",
  "corrections": [
    {
      "mistake": "exact word or phrase from original that has the error",
      "correction": "exact replacement word or phrase",
      "message": "clear, friendly, and precise explanation of the grammatical issue written in BANGLA (বাংলা ভাষায় সহজ ও পরিষ্কার ব্যাখ্যা)",
      "category": "one of: TENSE, AGREEMENT, SPELLING, PUNCTUATION, WORD_CHOICE, ARTICLES, PREPOSITIONS, HYPHENATION, OTHER"
    }
  ]
}

Rules:
1. If the sentence is grammatically correct and natural English, set:
   "has_mistakes": false,
   "corrected": (same as original),
   "corrections": []
2. Only flag actual errors (verb tense, subject-verb agreement, spelling mistakes, missing essential punctuation, incorrect word forms).
3. CRITICAL REQUIREMENT FOR "message":
   The explanation ("message" field) MUST ALWAYS be written in natural, fluent, and clear BANGLA (বাংলা ভাষায় সহজ ও সুন্দর ব্যাখ্যা দিতে হবে).
   Explain the grammatical rule simply so a Bengali speaker can easily understand why it was incorrect and how to fix it.
   Examples:
   - For spelling error 'lov' -> 'love':
     "'lov' বানানটি ভুল। সঠিক ইংরেজি বানান হলো 'love'।"
   - For tense error 'was goes' -> 'went':
     "অতীত কালের বর্ণনায় 'was goes' না হয়ে Simple Past Tense হিসেবে 'went' বসবে।"
   - For subject-verb agreement 'he go' -> 'he goes':
     "'He' হলো Third Person Singular, তাই Present Indefinite Tense-এ মূল verb-এর সাথে 's/es' যোগ হয়ে 'goes' হবে।"
4. Keep the original voice, meaning, and informal tone if appropriate for chat.
5. Do NOT flag minor punctuation spacing (e.g. 'doing ?' or ';'). Never flag punctuation if it already exists in the text. Only flag genuine grammatical mistakes, word agreement, and spelling errors.
"""


def _sanitize_corrections(corrections: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Filter out trivial punctuation or identical mistake/correction pairs."""
    filtered = []
    for c in corrections:
        m = (c.get("mistake") or "").strip()
        r = (c.get("correction") or "").strip()
        if not m or not r or m == r:
            continue
        # Skip if both mistake and correction are purely punctuation
        if re.sub(r'[\s.,!?;:]', '', m) == '' and re.sub(r'[\s.,!?;:]', '', r) == '':
            continue
        filtered.append(c)
    return filtered


def _clean_json_str(raw: str) -> str:
    """Strip markdown code fences if model enclosed JSON in ```json ... ```."""
    s = raw.strip()
    if s.startswith("```"):
        s = re.sub(r"^```[a-zA-Z]*\s*", "", s)
        s = re.sub(r"\s*```$", "", s)
    return s.strip()


def _check_groq_ai(cleaned: str) -> Optional[Dict[str, Any]]:
    """Call Groq API using openai/gpt-oss-120b model."""
    global _groq_client
    if not GROQ_API_KEY:
        return None

    # Try SDK first
    if _groq_client:
        try:
            completion = _groq_client.chat.completions.create(
                model=GROQ_MODEL,
                messages=[
                    {"role": "system", "content": GROQ_SYSTEM_INSTRUCTION},
                    {"role": "user", "content": cleaned}
                ],
                temperature=0.2,
                max_tokens=1024,
                response_format={"type": "json_object"}
            )
            raw = completion.choices[0].message.content or ""
            data = json.loads(_clean_json_str(raw))
            corrs = _sanitize_corrections(data.get("corrections") or [])
            has_mistakes = bool(data.get("has_mistakes") and corrs)
            return {
                "status": "ok",
                "engine": f"groq:{GROQ_MODEL}",
                "original": data.get("original") or cleaned,
                "corrected": data.get("corrected") or cleaned,
                "has_mistakes": has_mistakes,
                "mistakes_count": len(corrs),
                "corrections": corrs,
            }
        except Exception as exc:
            logger.warning(f"[Grammar] Groq SDK call failed: {exc}")

    # Direct HTTP fallback to Groq endpoint if SDK had issues
    try:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": GROQ_MODEL,
            "messages": [
                {"role": "system", "content": GROQ_SYSTEM_INSTRUCTION},
                {"role": "user", "content": cleaned}
            ],
            "temperature": 0.2,
            "max_tokens": 1024,
            "response_format": {"type": "json_object"}
        }
        with httpx.Client(timeout=15.0) as client:
            resp = client.post(url, headers=headers, json=payload)
            if resp.status_code == 200:
                body = resp.json()
                raw = body["choices"][0]["message"]["content"]
                data = json.loads(_clean_json_str(raw))
                corrs = _sanitize_corrections(data.get("corrections") or [])
                has_mistakes = bool(data.get("has_mistakes") and corrs)
                return {
                    "status": "ok",
                    "engine": f"groq-http:{GROQ_MODEL}",
                    "original": data.get("original") or cleaned,
                    "corrected": data.get("corrected") or cleaned,
                    "has_mistakes": has_mistakes,
                    "mistakes_count": len(corrs),
                    "corrections": corrs,
                }
            else:
                logger.warning(f"[Grammar] Groq HTTP {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.warning(f"[Grammar] Groq HTTP direct call failed: {exc}")

    return None


def _check_languagetool_fallback(cleaned: str) -> Optional[Dict[str, Any]]:
    """Secondary Web API fallback if Groq is temporarily unreachable."""
    url = "https://api.languagetool.org/v2/check"
    payload = {"text": cleaned, "language": "auto"}
    headers = {"User-Agent": "GrammerLiveChat/2.0 (Windows NT 10.0; Win64; x64)"}

    try:
        with httpx.Client(timeout=4.0) as client:
            resp = client.post(url, data=payload, headers=headers)
            if resp.status_code == 200:
                data = resp.json()
                matches = data.get("matches", [])
                corrected_chars = list(cleaned)
                corrections = []

                for m in sorted(matches, key=lambda x: x.get("offset", 0), reverse=True):
                    offset = m.get("offset", 0)
                    length = m.get("length", 0)
                    message = m.get("message", "")
                    replacements = [r.get("value") for r in m.get("replacements", []) if r.get("value")]
                    rule_info = m.get("rule", {})
                    category_info = rule_info.get("category", {})

                    if replacements and length > 0 and (offset + length) <= len(cleaned):
                        best_replacement = replacements[0]
                        mistake_fragment = cleaned[offset:offset + length]
                        corrected_chars[offset:offset + length] = list(best_replacement)
                        corrections.append({
                            "mistake": mistake_fragment,
                            "correction": best_replacement,
                            "suggestions": replacements[:4],
                            "message": message,
                            "rule": rule_info.get("id", ""),
                            "category": category_info.get("name", "Grammar").upper(),
                            "offset": offset,
                            "length": length,
                        })

                return {
                    "status": "ok",
                    "engine": "languagetool_fallback",
                    "original": cleaned,
                    "corrected": "".join(corrected_chars),
                    "has_mistakes": len(corrections) > 0,
                    "mistakes_count": len(corrections),
                    "corrections": list(reversed(corrections)),
                }
    except Exception as exc:
        logger.warning(f"[Grammar] LanguageTool fallback failed: {exc}")

    return None


def check_grammar(text: str, customer_id: Optional[str] = None) -> Dict[str, Any]:
    """
    Check text for grammatical and spelling errors using Groq AI (openai/gpt-oss-120b).
    """
    cleaned = (text or "").strip()
    if not cleaned or len(cleaned) < 2:
        return {
            "status": "ok",
            "original": text,
            "corrected": text,
            "has_mistakes": False,
            "mistakes_count": 0,
            "corrections": [],
        }

    # Fast in-memory cache to strictly avoid hitting Groq rate limits for identical phrases
    cache_key = cleaned.lower()
    if cache_key in _GRAMMAR_CACHE:
        return _GRAMMAR_CACHE[cache_key]

    # 1. Groq AI with customized system instructions
    result = _check_groq_ai(cleaned)

    # 2. Secondary Web API fallback
    if not result:
        result = _check_languagetool_fallback(cleaned)

    # 3. Safe empty result if everything failed
    if not result:
        result = {
            "status": "ok",
            "original": cleaned,
            "corrected": cleaned,
            "has_mistakes": False,
            "mistakes_count": 0,
            "corrections": [],
        }

    if len(_GRAMMAR_CACHE) > _CACHE_MAX_SIZE:
        _GRAMMAR_CACHE.clear()
    _GRAMMAR_CACHE[cache_key] = result

    return result
