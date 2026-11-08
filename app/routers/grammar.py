from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from app.grammar import check_grammar
from app.async_utils import run_in_thread

router = APIRouter(prefix="/api/grammar", tags=["grammar"])


@router.post("/check")
async def api_check_grammar(request: Request):
    try:
        data = await request.json()
    except Exception:
        data = {}

    text = data.get("text", "")
    customer_id = data.get("customer_id") or data.get("customerid") or None
    result = await run_in_thread(check_grammar, text, customer_id)
    return JSONResponse(result)
