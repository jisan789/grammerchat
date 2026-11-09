// LiveChat — Multi-User Real-time WebSocket Client
// Apple Liquid Glass Aesthetics & Passcode Security

// ─────────────────────────────────────────────────
//  DOM References
// ─────────────────────────────────────────────────
const chatApp            = document.getElementById('chatApp');
const chatsScreen        = document.getElementById('chatsScreen');
const conversationScreen = document.getElementById('conversationScreen');
const chatBackBtn        = document.getElementById('chatBackBtn');

// Chats screen elements
const chatsUserAvatar            = document.getElementById('chatsUserAvatar');
const chatsUserSubtitle          = document.getElementById('chatsUserSubtitle');
const chatsHeaderProfileTrigger  = document.getElementById('chatsHeaderProfileTrigger');
const chatsSearchInput           = document.getElementById('chatsSearchInput');
const chatsSearchClearBtn        = document.getElementById('chatsSearchClearBtn');
const chatsListContainer         = document.getElementById('chatsListContainer');
const chatsEmptyState            = document.getElementById('chatsEmptyState');
const chatsCountBadge            = document.getElementById('chatsCountBadge');
const chatsSoundToggleBtn        = document.getElementById('chatsSoundToggleBtn');
const chatsNewChatBtn            = document.getElementById('chatsNewChatBtn');
const chatsProfileBtn            = document.getElementById('chatsProfileBtn');
const chatsLockAppBtn            = document.getElementById('chatsLockAppBtn');
const chatsLiveDrawingBtn        = document.getElementById('chatsLiveDrawingBtn');
const chatsEmptyNewBtn           = document.getElementById('chatsEmptyNewBtn');
const chatsSectionTitle          = document.getElementById('chatsSectionTitle');

// Conversation screen elements
const avatarImg          = document.getElementById('avatarImg');
const userNameEl         = document.getElementById('userName');
const userStatusEl       = document.getElementById('userStatus');
const avatarBadge        = document.querySelector('.avatar-badge');
const chatMessages       = document.getElementById('chatMessages');
const chatInput          = document.getElementById('chatInput');
const actionBtn          = document.getElementById('actionBtn');
const actionIcon         = document.getElementById('actionIcon');
const typingIndicator    = document.getElementById('typingIndicator');
const emojiPopover       = document.getElementById('emojiPopover');
const emojiBtn           = document.getElementById('emojiBtn');
const inputPill          = document.getElementById('inputPill');
const inputNormalContent = document.getElementById('inputNormalContent');
const inputRecordingContent = document.getElementById('inputRecordingContent');
const recordingTimer        = document.getElementById('recordingTimer');
const cancelRecordBtn       = document.getElementById('cancelRecordBtn');
const imageBtn              = document.getElementById('imageBtn');
const emojiImageBtn         = document.getElementById('emojiImageBtn');
const imageFileInput        = document.getElementById('imageFileInput');
const imageLightbox         = document.getElementById('imageLightbox');
const lightboxImage         = document.getElementById('lightboxImage');
const lightboxCloseBtn      = document.getElementById('lightboxCloseBtn');
const lightboxBackdrop      = document.getElementById('lightboxBackdrop');

const soundToggleBtn     = document.getElementById('soundToggleBtn');
const loveBlastBtn       = document.getElementById('loveBlastBtn');
const clearChatBtn       = document.getElementById('clearChatBtn');
const lockAppBtn         = document.getElementById('lockAppBtn');
const grammarCheckToggleBtn = document.getElementById('grammarCheckToggleBtn');
const grammarBar            = document.getElementById('grammarBar');
const grammarBarToggleBtn   = document.getElementById('grammarBarToggleBtn');
const grammarBarStatus      = document.getElementById('grammarBarStatus');

// PIN Lock Overlay elements
const pinOverlay         = document.getElementById('pinOverlay');
const pinDotsContainer   = document.getElementById('pinDots');
const pinFeedback        = document.getElementById('pinFeedback');
const pinBackspaceBtn    = document.getElementById('pinBackspaceBtn');
const pinUserBadgeWrap   = document.getElementById('pinUserBadgeWrap');
const pinUserAvatar      = document.getElementById('pinUserAvatar');
const pinTitleText       = document.getElementById('pinTitleText');
const pinSubtitleText    = document.getElementById('pinSubtitleText');
const pinSwitchAccountBtn= document.getElementById('pinSwitchAccountBtn');

// Auth Overlay (Login & Register) elements
const authOverlay        = document.getElementById('authOverlay');
const authTabLogin       = document.getElementById('authTabLogin');
const authTabRegister    = document.getElementById('authTabRegister');
const loginForm          = document.getElementById('loginForm');
const registerForm       = document.getElementById('registerForm');
const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');
const loginFeedback      = document.getElementById('loginFeedback');
const regUsernameInput   = document.getElementById('regUsername');
const regDisplayNameInput= document.getElementById('regDisplayName');
const regPasswordInput   = document.getElementById('regPassword');
const regFeedback        = document.getElementById('regFeedback');
const regAvatarPresets   = document.getElementById('regAvatarPresets');

// Passkey Setup Modal elements
const passkeySetupModal        = document.getElementById('passkeySetupModal');
const passkeySetupTitle        = document.getElementById('passkeySetupTitle');
const passkeySetupSubtitle     = document.getElementById('passkeySetupSubtitle');
const passkeySetupDots         = document.getElementById('passkeySetupDots');
const passkeySetupFeedback     = document.getElementById('passkeySetupFeedback');
const passkeySetupSkipBtn      = document.getElementById('passkeySetupSkipBtn');
const passkeySetupBackspaceBtn = document.getElementById('passkeySetupBackspaceBtn');

// Users Directory Sheet elements
const usersModal             = document.getElementById('usersModal');
const usersModalCloseBtn     = document.getElementById('usersModalCloseBtn');
const directorySearchInput   = document.getElementById('directorySearchInput');
const usersListContainer     = document.getElementById('usersListContainer');

// Profile & Settings Sheet elements
const profileModal             = document.getElementById('profileModal');
const profileModalCloseBtn     = document.getElementById('profileModalCloseBtn');
const profileMainAvatar        = document.getElementById('profileMainAvatar');
const profileDisplayNameInput  = document.getElementById('profileDisplayNameInput');
const profileAvatarPresets     = document.getElementById('profileAvatarPresets');
const profileSaveBtn           = document.getElementById('profileSaveBtn');
const profileChangePasskeyBtn  = document.getElementById('profileChangePasskeyBtn');
const profilePasskeyBtnText    = document.getElementById('profilePasskeyBtnText');
const profileLogoutBtn         = document.getElementById('profileLogoutBtn');

// Reply elements
const replyPreviewBar          = document.getElementById('replyPreviewBar');
const replyPreviewTitle        = document.getElementById('replyPreviewTitle');
const replyPreviewText         = document.getElementById('replyPreviewText');
const replyPreviewThumbWrapper = document.getElementById('replyPreviewThumbWrapper');
const replyPreviewThumb        = document.getElementById('replyPreviewThumb');
const replyPreviewCloseBtn     = document.getElementById('replyPreviewCloseBtn');

let activeReplyContext = null;

// ─────────────────────────────────────────────────
//  Suggested DiceBear Avatars
// ─────────────────────────────────────────────────
const PRESET_AVATARS = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=Shadow',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Cyber',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Pixel',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Nova',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=Aria',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=Kai',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Echo',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Blaze',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cool',
  'https://api.dicebear.com/7.x/micah/svg?seed=Milo'
];
let selectedRegAvatar = '';
let selectedProfileAvatar = '';

// ─────────────────────────────────────────────────
//  Multi-User App State
// ─────────────────────────────────────────────────
let activeUser          = null; // username of currently authenticated user
let currentUserProfile  = null; // { username, display_name, avatar, has_passkey }
let registeredUsersList = [];   // list of other registered users
let currentPartner      = { name: '', avatar: '', key: '' }; // active conversation partner
let enteredPin          = '';
let isOpponentOnline    = false;
let opponentLastSeen    = null;
let currentView         = 'chats'; // 'chats' | 'conversation'
let lastConversationMessage = null;
const conversationMessagesCache = new Map();

// Passkey setup flow state
let passkeySetupStep = 1; // 1 = enter pin, 2 = confirm pin
let passkeySetupFirstPin = '';
let passkeySetupEnteredPin = '';
let passkeySetupIsInitial = false;

// WebSocket state
let ws              = null;
let wsReconnectDelay = 1000;
let wsReconnectTimer = null;
let isManualDisconnect = false;

// Typing state
let typingOutTimer    = null;
let opponentTyping    = false;
let opponentTypingTimer = null;
let lastLocalTextLength = 0;

// Sound
let soundEnabled = localStorage.getItem('chat_typing_sound') !== 'false';
let grammarCheckEnabled = localStorage.getItem('chat_grammar_check_enabled') !== 'false';
let audioCtx     = null;
let KEYPRESS_AUDIO_BUFFERS = [];
let audioBuffersLoaded = false;
let lastSoundIndex = -1;
const soundBasePath = (window.location.pathname.includes('/static/') ? 'keypresssound/' : 'static/keypresssound/');
const SOUND_FILES = [
  'keypress-001.wav','keypress-002.wav','keypress-003.wav','keypress-004.wav',
  'keypress-005.wav','keypress-006.wav','keypress-007.wav','keypress-008.wav'
];

// Helper: authenticated fetch wrapper with strict zero-cache policy
async function authFetch(url, options = {}) {
  options.headers = options.headers || {};
  options.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  options.headers['Pragma'] = 'no-cache';
  options.headers['Expires'] = '0';
  options.cache = 'no-store';

  const token = localStorage.getItem('chat_session_token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  options.credentials = 'include';

  // Add cache-busting timestamp for GET requests to guarantee fresh load from DB
  let fetchUrl = url;
  const method = (options.method || 'GET').toUpperCase();
  if (method === 'GET') {
    const sep = fetchUrl.includes('?') ? '&' : '?';
    fetchUrl = `${fetchUrl}${sep}_t=${Date.now()}`;
  }

  return fetch(fetchUrl, options);
}

// ─────────────────────────────────────────────────
//  Boot & Authentication Lifecycle
// ─────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  // Clear any existing in-memory conversation cache so DB is always queried
  conversationMessagesCache.clear();
  if ('caches' in window) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
  }

  setupPinPad();
  setupPasskeySetupPad();
  setupAuthListeners();
  setupEventListeners();
  setupKeyboardUIHandling();
  preloadKeypressSounds();
  renderAvatarPresets();

  // Check if admin allows new account creation
  await checkAuthConfig();

  // Validate persistent session cookie on start
  await checkAuthStatus();
});

async function checkAuthStatus() {
  try {
    const res = await authFetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'ok' && data.user) {
        initLoggedInSession(data.user);
        if (data.user.has_passkey) {
          // Remember username & password login via cookies for long term,
          // but require the 4-digit passkey on every new visit for security
          lockApp();
        } else {
          // If passkey is not configured yet, unlock and prompt setup
          unlockApp();
          openPasskeySetup(true);
        }
        return;
      }
    }
  } catch (err) {
    console.warn('Auth check network warning:', err);
  }

  // Not authenticated: present login / create account overlay
  showAuthOverlay();
}

function initLoggedInSession(user) {
  currentUserProfile = user;
  activeUser = user.username;
  sessionStorage.setItem('chat_active_user', user.username);

  if (chatsUserAvatar) {
    chatsUserAvatar.src = user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.username)}`;
  }
  if (chatsUserSubtitle) {
    chatsUserSubtitle.textContent = `@${user.username}`;
  }
  if (chatsHeaderTitle) {
    chatsHeaderTitle.textContent = user.display_name || user.username;
  }

  // Configure PIN overlay for this user
  if (pinUserBadgeWrap && pinUserAvatar) {
    pinUserBadgeWrap.style.display = 'block';
    pinUserAvatar.src = user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.username)}`;
  }
  if (pinTitleText) {
    pinTitleText.textContent = user.display_name || user.username;
  }
  if (pinSubtitleText) {
    pinSubtitleText.textContent = 'Enter 4-digit passcode';
  }

  hideAuthOverlay();
  fetchRegisteredUsers();
}

// ─────────────────────────────────────────────────
//  Auth Overlay (Login & Create Account)
// ─────────────────────────────────────────────────
function showAuthOverlay() {
  if (pinOverlay) pinOverlay.classList.remove('unlocked');
  if (authOverlay) {
    authOverlay.style.display = 'flex';
    authOverlay.querySelectorAll('input, button').forEach(el => el.removeAttribute('disabled'));
  }
}

function hideAuthOverlay() {
  if (authOverlay) {
    authOverlay.style.display = 'none';
    authOverlay.querySelectorAll('input').forEach(el => el.setAttribute('disabled', 'true'));
  }
}

function renderAvatarPresets() {
  if (regAvatarPresets) {
    regAvatarPresets.innerHTML = PRESET_AVATARS.map((url, i) => `
      <div class="avatar-preset-chip ${selectedRegAvatar === url ? 'selected' : ''}" data-avatar="${url}" title="Avatar ${i + 1}">
        <img src="${url}" alt="DiceBear Avatar ${i + 1}">
      </div>
    `).join('');

    regAvatarPresets.querySelectorAll('.avatar-preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const isAlreadySelected = chip.classList.contains('selected');
        regAvatarPresets.querySelectorAll('.avatar-preset-chip').forEach(c => c.classList.remove('selected'));
        if (isAlreadySelected) {
          selectedRegAvatar = '';
        } else {
          chip.classList.add('selected');
          selectedRegAvatar = chip.dataset.avatar;
        }
      });
    });
  }

  if (profileAvatarPresets) {
    profileAvatarPresets.innerHTML = PRESET_AVATARS.map((url, i) => `
      <div class="avatar-preset-chip ${selectedProfileAvatar === url ? 'selected' : ''}" data-avatar="${url}" title="Avatar ${i + 1}">
        <img src="${url}" alt="DiceBear Avatar ${i + 1}">
      </div>
    `).join('');

    profileAvatarPresets.querySelectorAll('.avatar-preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const isAlreadySelected = chip.classList.contains('selected');
        profileAvatarPresets.querySelectorAll('.avatar-preset-chip').forEach(c => c.classList.remove('selected'));
        if (isAlreadySelected) {
          selectedProfileAvatar = '';
          if (profileMainAvatar && currentUserProfile) {
            profileMainAvatar.src = currentUserProfile.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUserProfile.username)}`;
          }
        } else {
          chip.classList.add('selected');
          selectedProfileAvatar = chip.dataset.avatar;
          if (profileMainAvatar) profileMainAvatar.src = selectedProfileAvatar;
        }
      });
    });
  }
}

let allowRegistration = false;

async function checkAuthConfig() {
  try {
    const res = await fetch('/api/auth/config');
    if (res.ok) {
      const data = await res.json();
      allowRegistration = Boolean(data.allow_registration);
      if (authTabRegister) {
        authTabRegister.style.display = allowRegistration ? 'block' : 'none';
      }
    }
  } catch (err) {
    if (authTabRegister) {
      authTabRegister.style.display = 'none';
    }
  }
}

function setupAuthListeners() {
  // Tabs
  if (authTabLogin && authTabRegister) {
    authTabLogin.addEventListener('click', () => {
      authTabLogin.classList.add('active');
      authTabRegister.classList.remove('active');
      if (loginForm) loginForm.style.display = 'flex';
      if (registerForm) registerForm.style.display = 'none';
      if (loginFeedback) loginFeedback.textContent = '';
    });

    authTabRegister.addEventListener('click', (e) => {
      if (!allowRegistration) {
        e.preventDefault();
        showToast('New account creation is currently disabled by administrator 🔒', 'info');
        return;
      }
      authTabRegister.classList.add('active');
      authTabLogin.classList.remove('active');
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'flex';
      if (regFeedback) regFeedback.textContent = '';
    });
  }

  // Login Form Submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = loginUsernameInput ? loginUsernameInput.value.trim() : '';
      const password = loginPasswordInput ? loginPasswordInput.value.trim() : '';
      if (!username || !password) return;

      if (loginFeedback) {
        loginFeedback.textContent = 'Verifying credentials...';
        loginFeedback.classList.remove('success');
      }

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok && data.status === 'ok') {
          if (data.token) localStorage.setItem('chat_session_token', data.token);
          initLoggedInSession(data.user);
          if (data.has_passkey) {
            unlockApp();
          } else {
            unlockApp();
            openPasskeySetup(true);
          }
        } else {
          if (loginFeedback) loginFeedback.textContent = data.message || 'Invalid credentials';
        }
      } catch (err) {
        if (loginFeedback) loginFeedback.textContent = 'Server connection error. Please try again.';
      }
    });
  }

  // Register Form Submit
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = regUsernameInput ? regUsernameInput.value.trim() : '';
      const displayName = regDisplayNameInput ? regDisplayNameInput.value.trim() : '';
      const password = regPasswordInput ? regPasswordInput.value.trim() : '';
      if (!allowRegistration) {
        if (regFeedback) regFeedback.textContent = 'New account registration is currently disabled by administrator.';
        return;
      }

      if (regFeedback) {
        regFeedback.textContent = 'Creating account...';
        regFeedback.classList.remove('success');
      }

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            username,
            display_name: displayName || username,
            password,
            avatar: selectedRegAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`
          })
        });
        const data = await res.json();
        if (res.ok && data.status === 'ok') {
          if (data.token) localStorage.setItem('chat_session_token', data.token);
          initLoggedInSession(data.user);
          unlockApp();
          // Ask to set up 4-digit passkey right after creating account!
          openPasskeySetup(true);
        } else {
          if (regFeedback) regFeedback.textContent = data.message || 'Registration failed';
        }
      } catch (err) {
        if (regFeedback) regFeedback.textContent = 'Server connection error. Please try again.';
      }
    });
  }

  // Switch account button from PIN overlay
  if (pinSwitchAccountBtn) {
    pinSwitchAccountBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }
}

// ─────────────────────────────────────────────────
//  Passkey Setup Flow (Prompt after account creation)
// ─────────────────────────────────────────────────
function openPasskeySetup(isInitial = false) {
  passkeySetupIsInitial = isInitial;
  passkeySetupStep = 1;
  passkeySetupFirstPin = '';
  passkeySetupEnteredPin = '';
  updatePasskeySetupDotsUI();

  if (passkeySetupTitle) {
    passkeySetupTitle.textContent = 'Set Up Passcode';
  }
  if (passkeySetupSubtitle) {
    passkeySetupSubtitle.textContent = 'Choose a 4-digit passcode for quick unlock';
  }
  if (passkeySetupFeedback) {
    passkeySetupFeedback.textContent = '';
  }
  if (passkeySetupModal) {
    passkeySetupModal.style.display = 'flex';
  }
}

function closePasskeySetup() {
  if (passkeySetupModal) {
    passkeySetupModal.style.display = 'none';
  }
}

function setupPasskeySetupPad() {
  document.querySelectorAll('.setup-pin-key[data-digit]').forEach(key => {
    key.addEventListener('click', (e) => {
      e.preventDefault();
      const d = key.getAttribute('data-digit');
      if (d !== null) handlePasskeySetupDigit(d);
    });
  });

  if (passkeySetupBackspaceBtn) {
    passkeySetupBackspaceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handlePasskeySetupBackspace();
    });
  }

  if (passkeySetupSkipBtn) {
    passkeySetupSkipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closePasskeySetup();
      showToast('You can set a passcode anytime in settings', 'info');
    });
  }
}

function handlePasskeySetupDigit(digit) {
  if (passkeySetupEnteredPin.length >= 4) return;
  passkeySetupEnteredPin += digit;
  updatePasskeySetupDotsUI();

  if (passkeySetupEnteredPin.length === 4) {
    setTimeout(processPasskeySetupStep, 150);
  }
}

function handlePasskeySetupBackspace() {
  if (passkeySetupEnteredPin.length > 0) {
    passkeySetupEnteredPin = passkeySetupEnteredPin.slice(0, -1);
    updatePasskeySetupDotsUI();
  }
}

function updatePasskeySetupDotsUI() {
  if (!passkeySetupDots) return;
  passkeySetupDots.querySelectorAll('.pin-dot').forEach((dot, i) => {
    dot.classList.toggle('filled', i < passkeySetupEnteredPin.length);
  });
}

async function processPasskeySetupStep() {
  if (passkeySetupStep === 1) {
    // Step 1 complete -> request confirmation
    passkeySetupFirstPin = passkeySetupEnteredPin;
    passkeySetupEnteredPin = '';
    passkeySetupStep = 2;
    updatePasskeySetupDotsUI();

    if (passkeySetupSubtitle) passkeySetupSubtitle.textContent = 'Re-enter your 4-digit passcode to confirm';
    if (passkeySetupFeedback) {
      passkeySetupFeedback.textContent = 'Confirm passcode';
      passkeySetupFeedback.style.color = '#8B5CF6';
    }
  } else if (passkeySetupStep === 2) {
    // Step 2 complete -> compare
    if (passkeySetupEnteredPin === passkeySetupFirstPin) {
      if (passkeySetupFeedback) {
        passkeySetupFeedback.textContent = 'Saving passcode...';
        passkeySetupFeedback.style.color = '#10B981';
      }

      try {
        const res = await authFetch('/api/auth/passkey/setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passkey: passkeySetupEnteredPin })
        });
        const data = await res.json();
        if (res.ok && data.status === 'ok') {
          if (currentUserProfile) currentUserProfile.has_passkey = true;
          closePasskeySetup();
          showToast('Passcode set successfully ✓', 'info');
        } else {
          showPasskeySetupError(data.message || 'Failed to save passcode');
        }
      } catch (err) {
        showPasskeySetupError('Network error saving passcode');
      }
    } else {
      showPasskeySetupError('Passcodes did not match. Try again.');
      setTimeout(() => {
        passkeySetupStep = 1;
        passkeySetupFirstPin = '';
        passkeySetupEnteredPin = '';
        updatePasskeySetupDotsUI();
        if (passkeySetupSubtitle) passkeySetupSubtitle.textContent = 'Choose a 4-digit passcode for quick unlock';
      }, 700);
    }
  }
}

function showPasskeySetupError(msg) {
  if (passkeySetupDots) passkeySetupDots.classList.add('error');
  if (passkeySetupFeedback) {
    passkeySetupFeedback.textContent = msg;
    passkeySetupFeedback.style.color = '#EF4444';
  }
  setTimeout(() => {
    passkeySetupEnteredPin = '';
    updatePasskeySetupDotsUI();
    if (passkeySetupDots) passkeySetupDots.classList.remove('error');
  }, 500);
}

// ─────────────────────────────────────────────────
//  PIN Lock & Unlock Screen
// ─────────────────────────────────────────────────
function setupPinPad() {
  document.querySelectorAll('.pin-key[data-digit]:not(.setup-pin-key)').forEach((key) => {
    key.addEventListener('click', (e) => {
      e.preventDefault();
      const digit = key.getAttribute('data-digit');
      if (digit !== null) handlePinDigit(digit);
    });
  });

  if (pinBackspaceBtn) {
    pinBackspaceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handlePinBackspace();
    });
  }

  window.addEventListener('keydown', (e) => {
    const overlay = pinOverlay || document.getElementById('pinOverlay');
    if (overlay && !overlay.classList.contains('unlocked') && (!authOverlay || authOverlay.style.display === 'none')) {
      let digit = null;
      if (e.key >= '0' && e.key <= '9') {
        digit = e.key;
      } else if (e.code && /^Numpad[0-9]$/.test(e.code)) {
        digit = e.code.replace('Numpad', '');
      }

      if (digit !== null) {
        e.preventDefault();
        handlePinDigit(digit);
        const btn = document.querySelector(`.pin-key:not(.setup-pin-key)[data-digit="${digit}"]`);
        if (btn) {
          btn.classList.add('active-press');
          setTimeout(() => btn.classList.remove('active-press'), 120);
        }
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handlePinBackspace();
      } else if (e.key === 'Enter' && enteredPin.length === 4) {
        e.preventDefault();
        verifyPin();
      }
    }
  });
}

function handlePinDigit(digit) {
  if (enteredPin.length >= 4) return;
  clearPinFeedback();
  enteredPin += digit;
  updatePinDotsUI();
  if (enteredPin.length === 4) setTimeout(verifyPin, 100);
}

function handlePinBackspace() {
  if (enteredPin.length > 0) {
    enteredPin = enteredPin.slice(0, -1);
    updatePinDotsUI();
    clearPinFeedback();
  }
}

function updatePinDotsUI() {
  document.querySelectorAll('#pinDots .pin-dot').forEach((dot, i) => {
    dot.classList.toggle('filled', i < enteredPin.length);
  });
}

function clearPinFeedback() {
  if (pinFeedback) { pinFeedback.textContent = ''; pinFeedback.classList.remove('visible'); }
}

async function verifyPin() {
  const userToCheck = activeUser || (currentUserProfile ? currentUserProfile.username : null);
  if (userToCheck) {
    try {
      const res = await authFetch('/api/auth/passkey/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userToCheck, passkey: enteredPin })
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        unlockApp();
        return;
      }
    } catch (e) {
      console.warn('Passkey verification error:', e);
    }
  }

  showPinError();
}


function showPinError() {
  if (pinDotsContainer) pinDotsContainer.classList.add('error');
  if (pinFeedback) { pinFeedback.textContent = 'Incorrect passcode. Try again.'; pinFeedback.classList.add('visible'); }
  setTimeout(() => {
    enteredPin = '';
    updatePinDotsUI();
    if (pinDotsContainer) pinDotsContainer.classList.remove('error');
  }, 500);
}

function unlockApp() {
  enteredPin = '';
  updatePinDotsUI();
  clearPinFeedback();

  if (pinOverlay) pinOverlay.classList.add('unlocked');
  hideAuthOverlay();

  getAudioContext();
  preloadKeypressSounds();

  showChatsList();
  fetchRegisteredUsers();

  if (activeUser) {
    connectWebSocket(activeUser);
  }
}

function lockApp() {
  isClosingByAvatarClick = true;
  if (chatInput) chatInput.blur();
  setTimeout(() => { isClosingByAvatarClick = false; }, 500);

  if (isRecording) cancelVoiceRecording();
  if (currentlyPlayingVoiceAudio) {
    try { currentlyPlayingVoiceAudio.pause(); } catch (_) {}
    currentlyPlayingVoiceAudio = null;
  }

  isManualDisconnect = true;
  disconnectWebSocket();

  enteredPin = '';
  updatePinDotsUI();
  clearPinFeedback();

  // Clear rendered message bubbles on lock
  document.querySelectorAll('#chatMessages .message-row').forEach(row => row.remove());
  if (currentLiveIncomingRow) currentLiveIncomingRow = null;
  lastOpponentTextLength = 0;
  lastConversationMessage = null;
  hideOpponentTyping();

  showChatsList();

  if (pinOverlay) pinOverlay.classList.remove('unlocked');
  setPresenceOffline();
  isManualDisconnect = false;
}

// ─────────────────────────────────────────────────
//  Multi-User Directory & Chats List Rendering
// ─────────────────────────────────────────────────
async function fetchRegisteredUsers() {
  if (!activeUser) return;
  try {
    const res = await authFetch(`/api/users?current_user=${encodeURIComponent(activeUser)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.users && Array.isArray(data.users)) {
        registeredUsersList = data.users.filter(u => u.username !== activeUser);
        renderChatsList();
      }
    }
  } catch (err) {
    console.warn('Error fetching users:', err);
  }
}

const FB_VERIFIED_BADGE_SVG = `
  <svg class="fb-verified-badge" viewBox="0 0 24 24" aria-label="Verified Profile" title="Verified Profile">
    <path fill="#1877F2" d="M12 2l2.4 2.1 3.2-.3 1.2 3 2.9 1.4-.8 3.1 1.8 2.6-2 2.5.3 3.2-3.1 1-1.6 2.8-3.1-.9-2.7 1.8-2.2-2.3-3.2.2-.8-3.1-2.8-1.5 1.1-3-1.6-2.7 2.1-2.4-.4-3.2 3.1-.9 1.5-2.8 3.1.9L12 2z"/>
    <path fill="none" stroke="#FFFFFF" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.3l2.4 2.4 5.1-5.1"/>
  </svg>
`;

function renderChatsList() {
  if (!chatsListContainer) return;

  const count = registeredUsersList.length;
  if (chatsCountBadge) chatsCountBadge.textContent = String(count);

  if (count === 0) {
    chatsListContainer.innerHTML = '';
    if (chatsEmptyState) chatsEmptyState.style.display = 'flex';
    return;
  }

  if (chatsEmptyState) chatsEmptyState.style.display = 'none';

  chatsListContainer.innerHTML = registeredUsersList.map(user => {
    const uname = user.username;
    const isOnline = Boolean(user.is_online);
    const lastMsg = user.last_message;
    const timeText = lastMsg ? (lastMsg.client_time || formatTimeFromIso(lastMsg.created_at)) : (isOnline ? 'Online' : 'Active');
    
    let previewText = 'Tap to start conversation';
    let isUnread = false;

    if (lastMsg) {
      const isOutgoing = lastMsg.sender === activeUser;
      const prefix = isOutgoing ? 'You: ' : '';
      if (lastMsg.msg_type === 'image') previewText = `${prefix}📷 Photo`;
      else if (lastMsg.msg_type === 'voice') previewText = `${prefix}🎙️ Voice message`;
      else previewText = `${prefix}${escapeHtml(lastMsg.text_content || '')}`;

      if (!isOutgoing && !lastMsg.seen && currentView !== 'conversation') {
        isUnread = true;
      }
    }

    return `
      <div class="chat-list-card" id="chatCard-${uname}" data-partner="${uname}">
        <div class="chat-card-avatar-wrap">
          <img class="chat-card-avatar" src="${user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(uname)}`}" alt="${user.display_name}">
          <span class="chat-card-badge ${isOnline ? 'is-online' : ''}" id="chatCardBadge-${uname}"></span>
        </div>
        <div class="chat-card-body">
          <div class="chat-card-row-top">
            <div class="chat-card-name-wrap">
              <span class="chat-card-name">${escapeHtml(user.display_name || uname)}</span>
              ${FB_VERIFIED_BADGE_SVG}
            </div>
            <span class="chat-card-time" id="chatCardTime-${uname}">${timeText}</span>
          </div>
          <div class="chat-card-row-bottom">
            <span class="chat-card-preview" id="chatCardPreview-${uname}">${previewText}</span>
            <span class="chat-card-unread-dot" id="chatCardUnreadDot-${uname}" style="${isUnread ? 'display: block;' : 'display: none;'}"></span>
          </div>
        </div>
        <svg class="chat-card-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    `;

  }).join('');

  // Attach click listeners to cards
  registeredUsersList.forEach(user => {
    const card = document.getElementById(`chatCard-${user.username}`);
    if (card) {
      card.addEventListener('click', () => {
        openConversationWith(user);
      });
    }
  });
}

function openConversationWith(partner) {
  isClosingByAvatarClick = false;
  currentPartner = {
    key: partner.username,
    name: partner.display_name || partner.username,
    avatar: partner.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(partner.username)}`
  };
  isOpponentOnline = Boolean(partner.is_online);
  opponentLastSeen = partner.last_seen;

  applyOpponentProfile(currentPartner.avatar, currentPartner.name);

  // Clear previous message DOM fast
  if (chatMessages) {
    chatMessages.querySelectorAll('.message-row').forEach(row => row.remove());
  }
  if (currentLiveIncomingRow) currentLiveIncomingRow = null;
  lastOpponentTextLength = 0;
  lastConversationMessage = null;
  hideOpponentTyping();
  if (chatInput) {
    chatInput.value = '';
    updateActionBtnState();
  }

  // Pre-render cached messages immediately on frame 0 so transition has zero blank flicker!
  if (conversationMessagesCache.has(partner.username)) {
    renderChatHistoryMessages(conversationMessagesCache.get(partner.username));
    scrollToBottom(true);
  }

  // 1. Immediately trigger hardware slide transition with zero delay
  openConversation();

  // 2. Fetch history and query presence smoothly in background
  setTimeout(() => {
    loadChatHistory(partner.username);
    wsSend({ type: 'presence_check', partner: partner.username });
  }, 10);
}

// ─────────────────────────────────────────────────
//  User Directory & Profile Modals
// ─────────────────────────────────────────────────
function openUsersModal() {
  if (!usersModal) return;
  renderDirectoryList('');
  usersModal.style.display = 'flex';
}

function closeUsersModal() {
  if (usersModal) usersModal.style.display = 'none';
}

function renderDirectoryList(filter = '') {
  if (!usersListContainer) return;
  const q = filter.trim().toLowerCase();
  const filtered = registeredUsersList.filter(u => {
    return u.username.toLowerCase().includes(q) || (u.display_name && u.display_name.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    usersListContainer.innerHTML = '<div style="text-align: center; color: #94A3B8; padding: 20px; font-size: 13px;">No people found</div>';
    return;
  }

  usersListContainer.innerHTML = filtered.map(u => `
    <div class="user-dir-card" data-uname="${u.username}">
      <div class="user-dir-avatar-wrap">
        <img class="user-dir-avatar" src="${u.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(u.username)}`}" alt="${u.display_name}">
        <span class="user-dir-badge ${u.is_online ? 'is-online' : ''}"></span>
      </div>
      <div class="user-dir-info">
        <div class="user-dir-name-row">
          <span class="user-dir-name">${escapeHtml(u.display_name || u.username)}</span>
          ${FB_VERIFIED_BADGE_SVG}
        </div>
        <span class="user-dir-username">@${escapeHtml(u.username)}</span>
      </div>
      <button type="button" class="user-dir-chat-btn">Chat</button>
    </div>
  `).join('');

  usersListContainer.querySelectorAll('.user-dir-card').forEach(card => {
    card.addEventListener('click', () => {
      const uname = card.dataset.uname;
      const user = registeredUsersList.find(u => u.username === uname);
      if (user) {
        closeUsersModal();
        openConversationWith(user);
      }
    });
  });
}

function openProfileModal() {
  if (!profileModal || !currentUserProfile) return;
  if (profileMainAvatar) {
    profileMainAvatar.src = currentUserProfile.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUserProfile.username)}`;
  }
  if (profileDisplayNameInput) {
    profileDisplayNameInput.value = currentUserProfile.display_name || '';
  }
  if (profilePasskeyBtnText) {
    profilePasskeyBtnText.textContent = currentUserProfile.has_passkey ? 'Change 4-Digit Passcode' : 'Set 4-Digit Passcode';
  }
  selectedProfileAvatar = currentUserProfile.avatar || '';
  profileModal.style.display = 'flex';
}

function closeProfileModal() {
  if (profileModal) profileModal.style.display = 'none';
}

async function logoutUser() {
  try {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  } catch (_) {}
  localStorage.removeItem('chat_session_token');
  sessionStorage.removeItem('chat_active_user');
  activeUser = null;
  currentUserProfile = null;
  conversationMessagesCache.clear();
  disconnectWebSocket();
  closeProfileModal();
  showAuthOverlay();
  showToast('Logged out successfully', 'info');
}

function showChatsList() {
  currentView = 'chats';
  isClosingByAvatarClick = true;
  if (chatApp) {
    chatApp.classList.remove('in-chat');
  }

  // Definitively deactivate and blur chatInput so mobile keyboard closes
  if (chatInput) {
    chatInput.blur();
    chatInput.value = '';
    updateActionBtnState();
  }
  if (inputPill) {
    inputPill.classList.remove('focused');
  }
  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur();
  }

  // Stop live typing broadcasting immediately
  clearTimeout(typingOutTimer);
  wsSend({ type: 'live_typing', text: '' });
  wsSend({ type: 'typing_stop' });

  // Cancel any active voice recording
  if (typeof isRecording !== 'undefined' && isRecording) {
    cancelVoiceRecording();
  }

  document.title = 'LiveChat — Chats';
  updateChatsListCardUI();

  setTimeout(() => {
    isClosingByAvatarClick = false;
  }, 250);
}

function openConversation() {
  currentView = 'conversation';
  isClosingByAvatarClick = false;
  if (chatApp) {
    chatApp.classList.add('in-chat');
  }
  if (currentPartner && currentPartner.name) {
    document.title = `LiveChat — ${currentPartner.name}`;
  }
  setTimeout(() => {
    scrollToBottom(true);
    if (activeUser) {
      acknowledgeAllSeen(activeUser);
      if (lastConversationMessage && !lastConversationMessage.isOutgoing) {
        lastConversationMessage.isSeen = true;
        updateChatsListCardUI();
      }
    }
  }, 210);
}

function getCardPreviewText() {
  if (opponentTyping) {
    return `<span class="chat-card-preview is-typing">typing...</span>`;
  }
  if (!lastConversationMessage) {
    return 'Tap to open conversation';
  }
  const prefix = lastConversationMessage.isOutgoing ? 'You: ' : '';
  if (lastConversationMessage.msg_type === 'image') {
    return `${prefix}📷 Photo`;
  }
  if (lastConversationMessage.msg_type === 'voice') {
    const dur = lastConversationMessage.media_duration ? ` (${formatDuration(Math.round(lastConversationMessage.media_duration))})` : '';
    return `${prefix}🎙️ Voice message${dur}`;
  }
  return `${prefix}${escapeHtml(lastConversationMessage.text || '')}`;
}

const userTypingTimers = new Map();

function updateUserTypingOnList(userKey, isTyping) {
  if (!userKey) return;
  const previewEl = document.getElementById(`chatCardPreview-${userKey}`);
  if (!previewEl) return;

  if (userTypingTimers.has(userKey)) {
    clearTimeout(userTypingTimers.get(userKey));
    userTypingTimers.delete(userKey);
  }

  if (isTyping) {
    previewEl.innerHTML = `
      <span class="chat-card-typing-indicator">
        <span class="chat-card-typing-dots">
          <span class="chat-card-typing-dot"></span>
          <span class="chat-card-typing-dot"></span>
          <span class="chat-card-typing-dot"></span>
        </span>
        typing...
      </span>
    `;

    const timer = setTimeout(() => {
      userTypingTimers.delete(userKey);
      restoreUserCardPreview(userKey);
    }, 4500);
    userTypingTimers.set(userKey, timer);
  } else {
    restoreUserCardPreview(userKey);
  }
}

function restoreUserCardPreview(userKey) {
  const previewEl = document.getElementById(`chatCardPreview-${userKey}`);
  if (!previewEl) return;

  if (currentPartner && currentPartner.key === userKey && lastConversationMessage) {
    previewEl.innerHTML = getCardPreviewText();
    return;
  }

  const u = registeredUsersList.find(item => item.username === userKey);
  if (u && u.last_message) {
    const lastMsg = u.last_message;
    const isOutgoing = (lastMsg.sender === activeUser);
    const prefix = isOutgoing ? 'You: ' : '';
    if (lastMsg.msg_type === 'image') previewEl.textContent = `${prefix}📷 Photo`;
    else if (lastMsg.msg_type === 'voice') previewEl.textContent = `${prefix}🎙️ Voice message`;
    else previewEl.textContent = `${prefix}${lastMsg.text_content || ''}`;
  } else {
    previewEl.textContent = 'Tap to start conversation';
  }
}

function getMessageStatusHtml(status = 'sent') {
  if (status === 'pending' || status === 'sent') {
    // For only send show nothing
    return `<span class="msg-status-badge status-sent" title="Sent"></span>`;
  }
  if (status === 'delivered') {
    // For delivered a white small dot on current space
    return `<span class="msg-status-badge status-delivered" title="Delivered"><span class="status-dot dot-delivered"></span></span>`;
  }
  // For seen, dot becomes orange
  return `<span class="msg-status-badge status-seen" title="Seen"><span class="status-dot dot-seen"></span></span>`;
}

function updateMessageDeliveryStatus(msgId, status) {
  if (!msgId) return;
  const row = document.querySelector(`#chatMessages .message-row[data-msg-id="${msgId}"]`) ||
              document.querySelector(`#chatMessages .message-row[data-db-id="${msgId}"]`);
  if (!row || !row.classList.contains('outgoing')) return;
  const badgeWrap = row.querySelector('.msg-status-badge');
  if (badgeWrap) {
    badgeWrap.outerHTML = getMessageStatusHtml(status);
  } else {
    const bubble = row.querySelector('.bubble');
    if (bubble) {
      const wrap = document.createElement('div');
      wrap.innerHTML = getMessageStatusHtml(status);
      if (wrap.firstElementChild) bubble.appendChild(wrap.firstElementChild);
    }
  }
}

function updateChatsListCardUI() {
  if (!currentPartner.key) return;
  const badge = document.getElementById(`chatCardBadge-${currentPartner.key}`);
  if (badge) {
    badge.classList.toggle('is-online', isOpponentOnline);
  }

  const timeEl = document.getElementById(`chatCardTime-${currentPartner.key}`);
  if (timeEl) {
    timeEl.textContent = lastConversationMessage ? (lastConversationMessage.time || 'Now') : (isOpponentOnline ? 'Online' : 'Active');
  }

  const prevEl = document.getElementById(`chatCardPreview-${currentPartner.key}`);
  if (prevEl && !userTypingTimers.has(currentPartner.key)) {
    prevEl.innerHTML = getCardPreviewText();
  }

  const dotEl = document.getElementById(`chatCardUnreadDot-${currentPartner.key}`);
  if (dotEl) {
    const isUnread = (lastConversationMessage && !lastConversationMessage.isOutgoing && !lastConversationMessage.isSeen && currentView !== 'conversation');
    dotEl.style.display = isUnread ? 'block' : 'none';
  }
}

function filterChatsList(query) {
  const q = (query || '').trim().toLowerCase();
  if (chatsSearchClearBtn) {
    chatsSearchClearBtn.style.display = q ? 'block' : 'none';
  }

  const cards = chatsListContainer ? chatsListContainer.querySelectorAll('.chat-list-card') : [];
  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.querySelector('.chat-card-name')?.textContent?.toLowerCase() || '';
    const preview = card.querySelector('.chat-card-preview')?.textContent?.toLowerCase() || '';
    if (!q || name.includes(q) || preview.includes(q)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (chatsCountBadge) chatsCountBadge.textContent = String(visibleCount);
  if (chatsEmptyState) chatsEmptyState.style.display = visibleCount === 0 ? 'flex' : 'none';
}


// ─────────────────────────────────────────────────
//  Chat History & Persistence
// ─────────────────────────────────────────────────
function formatTimeFromIso(isoString) {
  if (!isoString) return formatCurrentTime();
  try {
    const cleanStr = isoString.includes('T') ? isoString : isoString.replace(' ', 'T') + 'Z';
    const date = new Date(cleanStr);
    if (isNaN(date.getTime())) return formatCurrentTime();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  } catch (e) {
    return formatCurrentTime();
  }
}

function acknowledgeAllSeen(userKey) {
  if (!userKey || !currentPartner.key) return;
  wsSend({
    type: 'seen',
    to: currentPartner.key,
    opponent: currentPartner.key,
    user: userKey,
    all: true
  });
  authFetch('/api/messages/seen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userKey, opponent: currentPartner.key, all: true })
  }).catch(() => {});
}

function notifyMessageSeen(messageId) {
  if (!activeUser || !currentPartner.key || !messageId) return;
  wsSend({
    type: 'seen',
    to: currentPartner.key,
    opponent: currentPartner.key,
    msg_id: messageId,
    user: activeUser
  });
  authFetch('/api/messages/seen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: activeUser, opponent: currentPartner.key, ids: [messageId] })
  }).catch(() => {});
}

function markOutgoingMessagesSeen(targetMsgId = null, ids = null, isAll = false) {
  if (isAll) {
    document.querySelectorAll('#chatMessages .message-row.outgoing .msg-status-badge').forEach(badge => {
      badge.outerHTML = getMessageStatusHtml('seen');
    });
    if (currentPartner && currentPartner.key && conversationMessagesCache.has(currentPartner.key)) {
      const cached = conversationMessagesCache.get(currentPartner.key);
      cached.forEach(m => { if (m.sender === activeUser) m.seen = true; });
    }
    return;
  }

  const idList = ids ? (Array.isArray(ids) ? ids : [ids]) : (targetMsgId ? [targetMsgId] : []);
  if (idList.length > 0) {
    idList.forEach(id => {
      updateMessageDeliveryStatus(id, 'seen');
    });
    if (currentPartner && currentPartner.key && conversationMessagesCache.has(currentPartner.key)) {
      const cached = conversationMessagesCache.get(currentPartner.key);
      cached.forEach(m => {
        if (idList.includes(m.client_msg_id) || idList.includes(String(m.id)) || idList.includes(m.id)) {
          m.seen = true;
        }
      });
    }
  } else {
    document.querySelectorAll('#chatMessages .message-row.outgoing .msg-status-badge').forEach(badge => {
      badge.outerHTML = getMessageStatusHtml('seen');
    });
    if (currentPartner && currentPartner.key && conversationMessagesCache.has(currentPartner.key)) {
      const cached = conversationMessagesCache.get(currentPartner.key);
      cached.forEach(m => { if (m.sender === activeUser) m.seen = true; });
    }
  }
}

async function refreshOpponentPresence() {
  if (!activeUser) return;
  try {
    const res = await fetch(`/api/presence/${encodeURIComponent(activeUser)}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data.status === 'ok') {
      isOpponentOnline = Boolean(data.is_online);
      if (data.last_seen) {
        opponentLastSeen = data.last_seen;
      }
      setPresenceUI(isOpponentOnline);
    }
  } catch (_) {}
}

function renderChatHistoryMessages(messages) {
  if (!messages || !Array.isArray(messages)) return null;

  // Index all existing rows in DOM by:
  // 1. data-msg-id (client assigned ID)
  // 2. data-db-id (server DB integer ID)
  // 3. Content signature: sender|time|snippet
  const existingMsgRows = document.querySelectorAll('#chatMessages .message-row');
  const existingIdMap = new Map();
  const existingSigMap = new Map();

  existingMsgRows.forEach(row => {
    const mId = row.dataset.msgId;
    const dbId = row.dataset.dbId;
    if (mId) existingIdMap.set(String(mId), row);
    if (dbId) existingIdMap.set(String(dbId), row);

    const senderType = row.classList.contains('outgoing') ? 'outgoing' : 'incoming';
    const timeEl = row.querySelector('.message-time');
    const timeStr = timeEl ? timeEl.textContent.trim() : '';
    const textEl = row.querySelector('.bubble-text-content') || row.querySelector('.bubble');
    let textSnippet = '';
    if (textEl) {
      const clone = textEl.cloneNode(true);
      clone.querySelectorAll('.seen-dot, .reply-quote-chip').forEach(el => el.remove());
      textSnippet = clone.textContent.trim().substring(0, 40);
    }
    if (textSnippet || timeStr) {
      const sig = `${senderType}|${timeStr}|${textSnippet}`;
      existingSigMap.set(sig, row);
    }
  });

  let appendedAny = false;
  let hadIncoming = false;

  for (const msg of messages) {
    const dbIdStr = String(msg.id);
    const clientMsgIdStr = msg.client_msg_id ? String(msg.client_msg_id) : null;
    const isOutgoing = (msg.sender === activeUser);
    const type = isOutgoing ? 'outgoing' : 'incoming';
    const timeStr = msg.client_time || formatTimeFromIso(msg.created_at);
    const isSeen = Boolean(msg.seen);

    if (!isOutgoing) {
      hadIncoming = true;
    }

    // Check if this message already exists in DOM
    let matchingRow = null;
    if (clientMsgIdStr && existingIdMap.has(clientMsgIdStr)) {
      matchingRow = existingIdMap.get(clientMsgIdStr);
    } else if (existingIdMap.has(dbIdStr)) {
      matchingRow = existingIdMap.get(dbIdStr);
    } else {
      const textContent = msg.text_content || '';
      const textSnippet = msg.msg_type === 'chat' ? textContent.trim().substring(0, 40) : '';
      const sig = `${type}|${timeStr}|${textSnippet}`;
      if (textSnippet && existingSigMap.has(sig)) {
        matchingRow = existingSigMap.get(sig);
      }
    }

    if (matchingRow) {
      // Message already exists in DOM: cleanly sync DB id and seen status without re-appending!
      matchingRow.dataset.dbId = dbIdStr;
      if (clientMsgIdStr && !matchingRow.dataset.msgId) {
        matchingRow.dataset.msgId = clientMsgIdStr;
      }
      if (isOutgoing) {
        const badgeWrap = matchingRow.querySelector('.msg-status-badge');
        if (badgeWrap) {
          badgeWrap.outerHTML = getMessageStatusHtml(isSeen ? 'seen' : 'delivered');
        }
      }
      continue;
    }

    let replyToData = msg.reply_to || null;
    if (replyToData && typeof replyToData === 'string') {
      try {
        replyToData = JSON.parse(replyToData);
      } catch (_) {}
    }

    const assignedMsgId = clientMsgIdStr || ('msg_' + dbIdStr);
    const deliveryStatus = isSeen ? 'seen' : 'delivered';

    if (msg.msg_type === 'chat') {
      appendMessage(msg.text_content, type, timeStr, assignedMsgId, deliveryStatus, true, replyToData);
      appendedAny = true;
    } else if (msg.msg_type === 'voice' && (msg.text_content || msg.audio || msg.text)) {
      const voiceSrc = msg.audio || msg.text_content || msg.text;
      appendVoiceMessage(voiceSrc, msg.media_duration || msg.duration || 1, type, timeStr, assignedMsgId, null, deliveryStatus, true, replyToData);
      appendedAny = true;
    } else if (msg.msg_type === 'image' && (msg.text_content || msg.image)) {
      appendImageMessage(msg.text_content || msg.image, type, timeStr, assignedMsgId, deliveryStatus, true, replyToData);
      appendedAny = true;
    }

    const newlyCreatedRow = document.querySelector(`#chatMessages .message-row[data-msg-id="${assignedMsgId}"]`);
    if (newlyCreatedRow) {
      newlyCreatedRow.dataset.dbId = dbIdStr;
      existingIdMap.set(assignedMsgId, newlyCreatedRow);
      existingIdMap.set(dbIdStr, newlyCreatedRow);
    }
  }

  if (messages.length > 0) {
    const lastMsg = messages[messages.length - 1];
    lastConversationMessage = {
      text: lastMsg.text_content || '',
      msg_type: lastMsg.msg_type || 'chat',
      media_duration: lastMsg.media_duration,
      time: lastMsg.client_time || formatTimeFromIso(lastMsg.created_at),
      isOutgoing: (lastMsg.sender === activeUser),
      isSeen: Boolean(lastMsg.seen)
    };
    updateChatsListCardUI();
  }

  if (appendedAny) {
    scrollToBottom();
  }

  return { appendedAny, hadIncoming };
}

async function loadChatHistory(userKey) {
  if (!userKey) return;
  try {
    const res = await authFetch(`/api/messages/${encodeURIComponent(userKey)}?user=${encodeURIComponent(activeUser || '')}`);
    if (!res.ok) return;
    const data = await res.json();
    if (!data.messages) return;

    conversationMessagesCache.set(userKey, data.messages);
    const renderRes = renderChatHistoryMessages(data.messages);

    // Sync opponent presence and last seen time from server payload
    if (data.is_opponent_online !== undefined) {
      isOpponentOnline = Boolean(data.is_opponent_online);
      if (data.opponent_last_seen) {
        opponentLastSeen = data.opponent_last_seen;
      }
      setPresenceUI(isOpponentOnline);
    }

    // Since the user is viewing chat history, mark all incoming messages seen if in conversation
    if (renderRes && renderRes.hadIncoming && currentView === 'conversation') {
      acknowledgeAllSeen(userKey);
    }
  } catch (err) {
    console.warn('[DB] Failed to load chat history:', err);
  }
}

// ─────────────────────────────────────────────────
//  WebSocket — Connection Management
// ─────────────────────────────────────────────────
function getWsUrl(userKey) {
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${proto}://${window.location.host}/ws/${userKey}`;
}

function connectWebSocket(userKey) {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;
  clearTimeout(wsReconnectTimer);

  try {
    ws = new WebSocket(getWsUrl(userKey));
  } catch (e) {
    console.warn('WS connect failed:', e);
    scheduleReconnect(userKey);
    return;
  }

  ws.onopen = () => {
    console.log('[WS] connected as', userKey);
    wsReconnectDelay = 1000; // reset backoff on success

    // Silently flush offline queue in the background
    if (offlineQueue.length > 0) {
      const itemsToFlush = [...offlineQueue];
      offlineQueue = [];
      itemsToFlush.forEach(payload => {
        wsSend(payload, true);
      });
    }

    if (currentPartner && currentPartner.key) {
      loadChatHistory(currentPartner.key);
    }
  };

  ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);
      handleWsMessage(msg);
    } catch (e) {
      console.warn('[WS] bad JSON', e);
    }
  };

  ws.onclose = (e) => {
    console.log('[WS] disconnected code:', e.code);
    ws = null;
    setPresenceOffline();
    if (!isManualDisconnect && activeUser) scheduleReconnect(activeUser);
  };

  ws.onerror = (e) => {
    console.warn('[WS] error', e);
  };
}

function disconnectWebSocket() {
  clearTimeout(wsReconnectTimer);
  if (ws) {
    ws.close();
    ws = null;
  }
}

function scheduleReconnect(userKey) {
  clearTimeout(wsReconnectTimer);
  wsReconnectTimer = setTimeout(() => {
    if (activeUser) {
      wsReconnectDelay = Math.min(wsReconnectDelay * 2, 30000);
      connectWebSocket(userKey);
    }
  }, wsReconnectDelay);
}

let offlineQueue = [];

function wsSend(payload, shouldQueue = false) {
  if (currentPartner && currentPartner.key) {
    if (!payload.to) payload.to = currentPartner.key;
    if (!payload.recipient) payload.recipient = currentPartner.key;
    if (!payload.partner) payload.partner = currentPartner.key;
  }
  if (ws && ws.readyState === WebSocket.OPEN) {
    try {
      ws.send(JSON.stringify(payload));
      return true;
    } catch (e) {
      console.warn('[WS] send failed:', e);
    }
  }
  if (shouldQueue) {
    offlineQueue.push(payload);
  }
  return false;
}

// ─────────────────────────────────────────────────
//  WebSocket — Incoming Message Router
// ─────────────────────────────────────────────────
function handleWsMessage(msg) {
  switch (msg.type) {

    // ── Presence & Pong Heartbeat ─────────────────
    case 'presence':
    case 'pong':
      if (msg.user) {
        const u = registeredUsersList.find(item => item.username === msg.user);
        if (u) {
          if (msg.status !== undefined) u.is_online = msg.status === 'online';
          if (msg.last_seen) u.last_seen = msg.last_seen;
          updateChatsListCardUI();
        }
      }
      if (!msg.user || msg.user === currentPartner.key) {
        if (msg.status !== undefined) {
          isOpponentOnline = msg.status === 'online';
        }
        if (msg.last_seen) {
          opponentLastSeen = msg.last_seen;
        }
        setPresenceUI(isOpponentOnline);
      }
      break;

    // ── Chat message (Cross-Device Synchronized) ─
    case 'chat':
      if (msg.from === activeUser || msg.self_sync) {
        const targetKey = msg.to || msg.recipient;
        if (currentPartner && currentPartner.key === targetKey && currentView === 'conversation') {
          appendMessage(msg.text, 'outgoing', msg.time, msg.id, 'sent', false, msg.reply_to);
        } else if (targetKey) {
          const u = registeredUsersList.find(item => item.username === targetKey);
          if (u) {
            u.last_message = { text_content: msg.text, msg_type: 'chat', client_time: msg.time, seen: true, sender: activeUser };
            renderChatsList();
          }
        }
      } else if (currentPartner && msg.from === currentPartner.key && currentView === 'conversation') {
        receiveIncomingMessage(msg.text, msg.time, msg.id, msg.reply_to);
        notifyMessageSeen(msg.id);
      } else {
        const u = registeredUsersList.find(item => item.username === msg.from);
        if (u) {
          u.last_message = { text_content: msg.text, msg_type: 'chat', client_time: msg.time, seen: false, sender: msg.from };
          renderChatsList();
        }
        showToast(`New message from ${u ? u.display_name : msg.from}`, 'info');
      }
      break;

    // ── Chat message edited (e.g. Grammar Auto-Correction) ──
    case 'chat_edit': {
      const editMsgId = msg.id || msg.client_msg_id;
      const newText = msg.text || msg.corrected;
      if (editMsgId && newText) {
        applyMessageEdit(editMsgId, newText, msg.corrections, false, msg.original);
      }
      break;
    }

    // ── Voice note (Live WebSocket & Multi-Device) ──
    case 'voice': {
      const voiceSrc = msg.audio || msg.text || msg.text_content;
      const voiceDur = msg.duration || msg.media_duration || 1;
      const voiceTime = msg.time || msg.client_time;
      const voiceId = msg.id || msg.client_msg_id;
      if (msg.from === activeUser || msg.self_sync) {
        const targetKey = msg.to || msg.recipient;
        if (currentPartner && currentPartner.key === targetKey && currentView === 'conversation') {
          appendVoiceMessage(voiceSrc, voiceDur, 'outgoing', voiceTime, voiceId, msg.waveform, 'sent', false, msg.reply_to);
        } else if (targetKey) {
          const u = registeredUsersList.find(item => item.username === targetKey);
          if (u) {
            u.last_message = { msg_type: 'voice', text_content: 'Voice message', client_time: voiceTime, seen: true, sender: activeUser };
            renderChatsList();
          }
        }
      } else if (currentPartner && msg.from === currentPartner.key && currentView === 'conversation') {
        receiveIncomingVoice(voiceSrc, voiceDur, voiceTime, voiceId, msg.waveform, msg.reply_to);
        if (voiceId) notifyMessageSeen(voiceId);
      } else {
        const u = registeredUsersList.find(item => item.username === msg.from);
        if (u) {
          u.last_message = { msg_type: 'voice', text_content: 'Voice note', client_time: voiceTime, seen: false, sender: msg.from };
          renderChatsList();
        }
        showToast(`Voice note from ${u ? u.display_name : msg.from}`, 'info');
      }
      break;
    }

    // ── Image message (Live WebSocket & Multi-Device) ─
    case 'image':
      if (msg.from === activeUser || msg.self_sync) {
        const targetKey = msg.to || msg.recipient;
        if (currentPartner && currentPartner.key === targetKey && currentView === 'conversation') {
          appendImageMessage(msg.image || msg.text_content, 'outgoing', msg.time, msg.id, 'sent', false, msg.reply_to);
        } else if (targetKey) {
          const u = registeredUsersList.find(item => item.username === targetKey);
          if (u) {
            u.last_message = { msg_type: 'image', client_time: msg.time, seen: true, sender: activeUser };
            renderChatsList();
          }
        }
      } else if (currentPartner && msg.from === currentPartner.key && currentView === 'conversation') {
        receiveIncomingImage(msg.image, msg.time, msg.id, msg.reply_to);
        notifyMessageSeen(msg.id);
      } else {
        const u = registeredUsersList.find(item => item.username === msg.from);
        if (u) {
          u.last_message = { msg_type: 'image', client_time: msg.time, seen: false, sender: msg.from };
          renderChatsList();
        }
        showToast(`Photo from ${u ? u.display_name : msg.from}`, 'info');
      }
      break;

    // ── Message Delivery Confirmation ─────────────
    case 'msg_ack':
      updateMessageDeliveryStatus(msg.id, msg.status || 'delivered');
      break;

    // ── Chat cleared ──────────────────────────────
    case 'chat_cleared':
      if (!msg.from || msg.from === currentPartner.key || (msg.self_cleared && currentPartner.key === msg.from)) {
        clearChatDOM();
        showToast('Chat history cleared', 'info');
      }
      break;

    // ── Live real-time typing preview ─────────────
    case 'live_typing':
      if (currentPartner && msg.from === currentPartner.key && currentView === 'conversation') {
        handleOpponentLiveTyping(msg.text);
      }
      updateUserTypingOnList(msg.from, Boolean(msg.text && msg.text.length > 0));
      break;

    // ── Typing indicators ─────────────────────────
    case 'typing_start':
      if (currentPartner && msg.from === currentPartner.key && currentView === 'conversation') {
        showOpponentTyping();
      }
      updateUserTypingOnList(msg.from, true);
      break;

    case 'typing_stop':
      if (currentPartner && msg.from === currentPartner.key && currentView === 'conversation') {
        hideOpponentLivePreview();
      }
      updateUserTypingOnList(msg.from, false);
      break;

    // ── Flying Balloon Emoji Reaction ─────────────
    case 'flying_emoji':
      if (Date.now() - lastIncomingEmojiTime >= 2000) {
        lastIncomingEmojiTime = Date.now();
        createFlyingBalloon(msg.emoji);
      }
      break;

    // ── Seen status ───────────────────────────────
    case 'seen':
    case 'mark_seen':
      markOutgoingMessagesSeen(msg.msg_id || msg.id, msg.ids, msg.all);
      break;

    // ── Seen sync across my devices ───────────────
    case 'seen_sync': {
      const oppKey = msg.opponent || msg.from;
      if (oppKey) {
        const u = registeredUsersList.find(item => item.username === oppKey);
        if (u && u.last_message) {
          u.last_message.seen = true;
          renderChatsList();
        }
        if (currentPartner && currentPartner.key === oppKey) {
          markOutgoingMessagesSeen(null, msg.ids, msg.all !== false);
        }
      }
      break;
    }
  }
}

// ─────────────────────────────────────────────────
//  Presence UI (Online / Offline)
// ─────────────────────────────────────────────────
function setPresenceUI(online) {
  isOpponentOnline = Boolean(online);
  const badge = avatarBadge || document.getElementById('avatarBadge') || document.querySelector('.avatar-badge');
  if (badge) {
    badge.classList.toggle('is-online', isOpponentOnline);
  }
  if (userStatusEl && !opponentTyping) {
    if (isOpponentOnline) {
      userStatusEl.textContent = 'Online';
      userStatusEl.className = 'user-status is-online';
    } else {
      userStatusEl.textContent = 'Offline';
      userStatusEl.className = 'user-status is-offline';
    }
  }
  updateChatsListCardUI();
}

function setPresenceOffline() {
  isOpponentOnline = false;
  setPresenceUI(false);
}

// ─────────────────────────────────────────────────
//  Typing Indicators & Snappy Live Keystroke Stream
// ─────────────────────────────────────────────────
let currentLiveIncomingRow = null;

function resetWaveStream() {
  if (currentLiveIncomingRow) {
    currentLiveIncomingRow.remove();
    currentLiveIncomingRow = null;
  }
}

function handleOpponentLiveTyping(text) {
  clearTimeout(opponentTypingTimer);

  if (!text || text.length === 0) {
    if (currentLiveIncomingRow) {
      currentLiveIncomingRow.remove();
      currentLiveIncomingRow = null;
    }
    hideOpponentTyping();
    return;
  }

  // Update status to typing...
  opponentTyping = true;
  if (userStatusEl) {
    userStatusEl.textContent = 'typing...';
    userStatusEl.classList.add('is-typing');
  }
  if (typingIndicator) {
    typingIndicator.classList.remove('active');
  }
  updateChatsListCardUI();

  // Create incoming bubble if it does not exist yet
  if (!currentLiveIncomingRow) {
    currentLiveIncomingRow = document.createElement('div');
    currentLiveIncomingRow.className = 'message-row incoming live-typing-row';

    const bubbleGroup = document.createElement('div');
    bubbleGroup.className = 'bubble-group';

    const bubble = document.createElement('div');
    bubble.className = 'bubble live-typing-bubble';

    const textNode = document.createElement('span');
    textNode.className = 'streaming-text';

    const cursorNode = document.createElement('span');
    cursorNode.className = 'streaming-cursor';

    bubble.appendChild(textNode);
    bubble.appendChild(cursorNode);
    bubbleGroup.appendChild(bubble);
    currentLiveIncomingRow.appendChild(bubbleGroup);

    chatMessages.insertBefore(currentLiveIncomingRow, typingIndicator);
  }

  const textNode = currentLiveIncomingRow.querySelector('.streaming-text');
  if (textNode) {
    if (isOnlyEmojis(text)) {
      const cnt = getEmojiCount(text);
      textNode.classList.add('only-emojis');
      if (cnt === 1) textNode.classList.add('only-single-emoji');
    } else {
      textNode.classList.remove('only-emojis', 'only-single-emoji');
    }
    textNode.innerHTML = renderEmojiHtml(text);
    scrollToBottom();
  }

  // Play peaceful keypress sound as characters are typed by opponent when mute is off
  if (text.length !== lastOpponentTextLength) {
    playOpponentLiveSound();
  }
  lastOpponentTextLength = text.length;

  // Auto-cleanup after 8s of silence if abandoned
  opponentTypingTimer = setTimeout(() => {
    if (currentLiveIncomingRow) {
      currentLiveIncomingRow.remove();
      currentLiveIncomingRow = null;
    }
    hideOpponentTyping();
  }, 8000);
}

function showOpponentTyping() {
  opponentTyping = true;
  clearTimeout(opponentTypingTimer);
  if (userStatusEl) {
    userStatusEl.textContent = 'typing...';
    userStatusEl.classList.add('is-typing');
  }
  if (!currentLiveIncomingRow && typingIndicator) {
    typingIndicator.classList.add('active');
    scrollToBottom();
  }
  updateChatsListCardUI();
  opponentTypingTimer = setTimeout(hideOpponentTyping, 4000);
}

function hideOpponentTyping() {
  opponentTyping = false;
  clearTimeout(opponentTypingTimer);
  if (currentLiveIncomingRow) {
    currentLiveIncomingRow.remove();
    currentLiveIncomingRow = null;
  }
  setPresenceUI(isOpponentOnline);
  if (typingIndicator) {
    typingIndicator.classList.remove('active');
  }
  updateChatsListCardUI();
}

function hideOpponentLivePreview() {
  hideOpponentTyping();
}

function clearChatDOM() {
  resetWaveStream();
  document.querySelectorAll('#chatMessages .message-row').forEach(row => row.remove());
  if (currentLiveIncomingRow) {
    currentLiveIncomingRow.remove();
    currentLiveIncomingRow = null;
  }
  lastConversationMessage = null;
  hideOpponentTyping();
  updateChatsListCardUI();
}

// ─────────────────────────────────────────────────
//  Native Static Emoji Engine (Instant & Zero-Lag)
// ─────────────────────────────────────────────────
function renderEmojiHtml(rawText) {
  if (!rawText) return '';
  return escapeHtml(rawText);
}

function parseEmojisInDOM(rootEl) {
  // Static native emojis — zero DOM manipulation, zero network lag
}

function isOnlyEmojis(text) {
  if (!text) return false;
  const trimmed = text.trim();
  if (!trimmed) return false;
  try {
    const emojiOnlyRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\u200D|\uFE0F|\uFE0E|\u{1F3FB}-\u{1F3FF}|\u{E0020}-\u{E007F}|\s)+$/u;
    if (!emojiOnlyRegex.test(trimmed)) return false;
    if (window.Intl && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      const segments = Array.from(segmenter.segment(trimmed)).filter(s => s.segment.trim().length > 0);
      return segments.length >= 1 && segments.length <= 4;
    }
    return true;
  } catch (_) {
    return false;
  }
}

function getEmojiCount(text) {
  if (!text) return 0;
  const trimmed = text.trim();
  if (window.Intl && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      const segments = Array.from(segmenter.segment(trimmed)).filter(s => s.segment.trim().length > 0);
      return segments.length;
    } catch (_) {}
  }
  return trimmed.length > 0 ? 1 : 0;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setReplyContext(replyObj) {
  if (!replyObj) return;
  activeReplyContext = replyObj;

  if (replyPreviewBar && replyPreviewTitle && replyPreviewText) {
    const senderName = replyObj.sender_name || replyObj.sender || (currentPartner ? currentPartner.name : 'Opponent');
    replyPreviewTitle.textContent = `Replying to ${senderName}`;

    let previewText = replyObj.text || '';
    if (replyObj.msg_type === 'voice') {
      const dur = replyObj.media_duration ? formatDuration(Math.round(replyObj.media_duration)) : '';
      previewText = `🎙️ Voice message ${dur ? `(${dur})` : ''}`;
    } else if (replyObj.msg_type === 'image') {
      previewText = '📷 Photo';
    }
    replyPreviewText.innerHTML = renderEmojiHtml(previewText || 'Message');

    if (replyPreviewThumbWrapper && replyPreviewThumb) {
      if (replyObj.msg_type === 'image' && (replyObj.image || replyObj.imageUrl)) {
        replyPreviewThumb.src = replyObj.image || replyObj.imageUrl;
        replyPreviewThumbWrapper.style.display = 'block';
      } else {
        replyPreviewThumbWrapper.style.display = 'none';
        replyPreviewThumb.src = '';
      }
    }

    replyPreviewBar.style.display = 'flex';
  }

  keepInputFocused();
}

function clearReplyContext() {
  activeReplyContext = null;
  if (replyPreviewBar) {
    replyPreviewBar.style.display = 'none';
  }
  if (replyPreviewThumb) {
    replyPreviewThumb.src = '';
  }
}

function createReplyQuoteElement(replyTo) {
  if (!replyTo) return null;
  const quoteEl = document.createElement('div');
  quoteEl.className = 'reply-quote-chip';
  const targetId = replyTo.id || replyTo.msg_id || '';
  if (targetId) {
    quoteEl.dataset.replyToId = targetId;
  }

  const senderName = replyTo.sender_name || replyTo.sender || (currentPartner ? currentPartner.name : 'Opponent');
  let snippet = replyTo.text || replyTo.text_content || '';
  const msgType = replyTo.msg_type || replyTo.type || 'chat';

  if (msgType === 'voice') {
    const dur = replyTo.media_duration ? formatDuration(Math.round(replyTo.media_duration)) : '';
    snippet = `🎙️ Voice message ${dur ? `(${dur})` : ''}`;
  } else if (msgType === 'image') {
    snippet = '📷 Photo';
  }

  quoteEl.innerHTML = `
    <div class="reply-quote-line"></div>
    <div class="reply-quote-inner">
      <div class="reply-quote-sender">${escapeHtml(senderName)}</div>
      <div class="reply-quote-snippet">${renderEmojiHtml(snippet)}</div>
    </div>
  `;

  if (msgType === 'image' && (replyTo.image || replyTo.imageUrl || replyTo.text_content)) {
    const thumbImg = document.createElement('img');
    thumbImg.className = 'reply-quote-thumb';
    thumbImg.src = replyTo.image || replyTo.imageUrl || replyTo.text_content;
    thumbImg.alt = 'Photo';
    quoteEl.appendChild(thumbImg);
  }

  quoteEl.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!targetId || !chatMessages) return;
    const targetRow = document.querySelector(`#chatMessages .message-row[data-msg-id="${targetId}"]`) ||
                      document.querySelector(`#chatMessages .message-row[data-db-id="${targetId}"]`);
    if (targetRow) {
      const targetOffset = targetRow.offsetTop - (chatMessages.clientHeight / 2) + (targetRow.clientHeight / 2);
      chatMessages.scrollTo({ top: Math.max(0, targetOffset), behavior: 'smooth' });
      targetRow.classList.add('message-highlight-pulse');
      setTimeout(() => targetRow.classList.remove('message-highlight-pulse'), 1600);
    } else {
      showToast('Original message not found in view', 'info');
    }
  });

  return quoteEl;
}

function attachSwipeToReply(messageRow, messageData) {
  // CRITICAL: Only opponent (incoming) messages can be replied to!
  // Own (outgoing) messages CANNOT be replied to.
  if (!messageRow || !messageRow.classList.contains('incoming')) return;

  const bubbleGroup = messageRow.querySelector('.bubble-group');
  if (!bubbleGroup) return;

  let indicator = messageRow.querySelector('.swipe-reply-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'swipe-reply-indicator';
    indicator.innerHTML = `
      <div class="swipe-reply-icon-circle">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 17 4 12 9 7"></polyline>
          <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
        </svg>
      </div>
    `;
    messageRow.insertBefore(indicator, messageRow.firstChild);
  }

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isSwiping = false;
  let hasTriggeredHaptic = false;
  const THRESHOLD = 38;
  const MAX_TRANSLATE = 65;

  function onTouchStart(e) {
    if (e.touches && e.touches.length > 1) return;
    const touch = e.touches ? e.touches[0] : e;
    startX = touch.clientX;
    startY = touch.clientY;
    currentX = startX;
    currentY = startY;
    isSwiping = false;
    hasTriggeredHaptic = false;
    bubbleGroup.style.transition = 'none';
    if (indicator) indicator.style.transition = 'none';
  }

  function onTouchMove(e) {
    const touch = e.touches ? e.touches[0] : e;
    currentX = touch.clientX;
    currentY = touch.clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;

    if (!isSwiping) {
      if (diffX > 7 && Math.abs(diffX) > Math.abs(diffY) * 1.1) {
        isSwiping = true;
      } else if (Math.abs(diffY) > 8) {
        return;
      }
    }

    if (isSwiping && diffX > 0) {
      if (e.cancelable) e.preventDefault();
      const clampedDx = Math.min(MAX_TRANSLATE, diffX * 0.65);
      bubbleGroup.style.transform = `translateX(${clampedDx}px)`;

      const progress = Math.min(1, clampedDx / THRESHOLD);
      if (indicator) {
        indicator.style.opacity = progress;
        indicator.style.transform = `translateY(-50%) translateX(${Math.min(clampedDx * 0.45, 20)}px) scale(${0.7 + progress * 0.35})`;
        indicator.classList.toggle('ready', clampedDx >= THRESHOLD);
      }

      if (clampedDx >= THRESHOLD && !hasTriggeredHaptic) {
        hasTriggeredHaptic = true;
        if (navigator.vibrate) {
          try { navigator.vibrate(12); } catch (_) {}
        }
      } else if (clampedDx < THRESHOLD && hasTriggeredHaptic) {
        hasTriggeredHaptic = false;
      }
    }
  }

  function onTouchEnd() {
    if (!isSwiping) return;
    isSwiping = false;

    const diffX = currentX - startX;
    const passed = (diffX * 0.65) >= THRESHOLD;

    bubbleGroup.style.transition = 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    bubbleGroup.style.transform = 'translateX(0px)';

    if (indicator) {
      indicator.style.transition = 'all 0.22s ease';
      indicator.style.opacity = '0';
      indicator.style.transform = 'translateY(-50%) translateX(0px) scale(0.6)';
      indicator.classList.remove('ready');
    }

    if (passed) {
      const msgId = messageData?.id || messageRow.dataset.msgId || messageRow.dataset.dbId || '';
      const senderName = currentPartner ? currentPartner.name : 'Opponent';
      const senderKey = currentPartner ? currentPartner.key : 'opponent';
      const msgType = messageData?.msgType || 'chat';
      let textSnippet = messageData?.text || '';

      if (msgType === 'chat' && !textSnippet) {
        const textNode = messageRow.querySelector('.bubble');
        if (textNode) {
          const clone = textNode.cloneNode(true);
          clone.querySelectorAll('.seen-dot, .reply-quote-chip').forEach(el => el.remove());
          textSnippet = clone.textContent.trim();
        }
      }

      setReplyContext({
        id: msgId,
        sender: senderKey,
        sender_name: senderName,
        msg_type: msgType,
        text: textSnippet,
        media_duration: messageData?.mediaDuration || null,
        imageUrl: messageData?.imageUrl || null,
        image: messageData?.imageUrl || null
      });
    }

    setTimeout(() => {
      bubbleGroup.style.transition = '';
      bubbleGroup.style.transform = '';
    }, 300);
  }

  messageRow.addEventListener('touchstart', onTouchStart, { passive: true });
  messageRow.addEventListener('touchmove', onTouchMove, { passive: false });
  messageRow.addEventListener('touchend', onTouchEnd, { passive: true });
  messageRow.addEventListener('touchcancel', onTouchEnd, { passive: true });

  // Mouse / Pointer drag for desktop testing
  let isMouseDown = false;
  messageRow.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || e.target.closest('.voice-play-btn, .chat-image-preview, .reply-quote-chip')) return;
    isMouseDown = true;
    onTouchStart(e);

    const onMouseMove = (ev) => {
      if (!isMouseDown) return;
      onTouchMove(ev);
    };
    const onMouseUp = (ev) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      onTouchEnd(ev);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });
}

// ─────────────────────────────────────────────────
//  Incoming Chat Message
// ─────────────────────────────────────────────────
function receiveIncomingMessage(text, timeStr, messageId = null, replyTo = null) {
  hideOpponentTyping();

  if (messageId && document.querySelector(`#chatMessages .message-row[data-msg-id="${messageId}"]`)) {
    return;
  }

  const assignedId = messageId || ('msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7));

  lastConversationMessage = {
    text: text,
    msg_type: 'chat',
    time: timeStr || formatCurrentTime(),
    isOutgoing: false,
    isSeen: currentView === 'conversation'
  };
  updateChatsListCardUI();

  // If the message was already being typed live, finalize that exact bubble!
  if (currentLiveIncomingRow) {
    resetWaveStream();
    const bubble = currentLiveIncomingRow.querySelector('.bubble');
    const textNode = currentLiveIncomingRow.querySelector('.streaming-text');
    const cursorNode = currentLiveIncomingRow.querySelector('.streaming-cursor');

    if (textNode) {
      if (isOnlyEmojis(text)) {
        const cnt = getEmojiCount(text);
        textNode.classList.add('only-emojis');
        if (cnt === 1) textNode.classList.add('only-single-emoji');
      } else {
        textNode.classList.remove('only-emojis', 'only-single-emoji');
      }
      textNode.innerHTML = renderEmojiHtml(text);
    }
    if (cursorNode) cursorNode.remove();
    if (bubble) bubble.classList.remove('live-typing-bubble');

    if (replyTo && bubble) {
      const quoteEl = createReplyQuoteElement(replyTo);
      if (quoteEl) bubble.prepend(quoteEl);
    }

    const timeEl = document.createElement('div');
    timeEl.className = 'message-time';
    timeEl.textContent = timeStr || formatCurrentTime();
    currentLiveIncomingRow.appendChild(timeEl);

    currentLiveIncomingRow.dataset.msgId = assignedId;
    attachSwipeToReply(currentLiveIncomingRow, {
      id: assignedId,
      sender: currentPartner ? currentPartner.name : 'Opponent',
      msgType: 'chat',
      text: text
    });

    currentLiveIncomingRow = null;
    scrollToBottom();
    if (activeUser && currentPartner.key) {
      notifyMessageSeen(assignedId);
    }
    triggerKeywordEmojiAnimations(text, false);
    return;
  }

  // Otherwise, append standard incoming message bubble
  appendMessage(text, 'incoming', timeStr, assignedId, false, false, replyTo);
  if (activeUser && currentPartner.key) {
    notifyMessageSeen(assignedId);
  }
  triggerKeywordEmojiAnimations(text, false);
}

// ─────────────────────────────────────────────────
//  Send Message
// ─────────────────────────────────────────────────

// ─────────────────────────────────────────────────
//  Grammar Checking Engine (LanguageTool / NLP)
// ─────────────────────────────────────────────────
function updateGrammarCheckUI() {
  if (grammarCheckToggleBtn) {
    grammarCheckToggleBtn.classList.toggle('active', grammarCheckEnabled);
    grammarCheckToggleBtn.title = `Grammar Check: ${grammarCheckEnabled ? 'ON' : 'OFF'} (Click to toggle)`;
  }
  if (grammarBar) {
    grammarBar.classList.toggle('active', grammarCheckEnabled);
  }
  if (grammarBarStatus) {
    grammarBarStatus.textContent = grammarCheckEnabled ? 'ON' : 'OFF';
  }
}

let activeGrammarPopover = null;

function closeAllGrammarPopovers() {
  if (activeGrammarPopover) {
    activeGrammarPopover.remove();
    activeGrammarPopover = null;
  }
}

// Global dismiss handler: close popover on tap/click outside
document.addEventListener('click', (e) => {
  if (activeGrammarPopover && !activeGrammarPopover.contains(e.target) && !e.target.closest('.grammar-inline-ins')) {
    closeAllGrammarPopovers();
  }
});

// Window resize or scroll: keep popover aligned or dismiss
window.addEventListener('resize', closeAllGrammarPopovers);

function showGrammarExplanation(targetSpan, message, category) {
  if (!targetSpan) return;

  // Clicking the same word again toggles it closed
  if (activeGrammarPopover && activeGrammarPopover.__target === targetSpan) {
    closeAllGrammarPopovers();
    return;
  }

  closeAllGrammarPopovers();

  const popover = document.createElement('div');
  popover.className = 'grammar-explanation-popover';
  popover.__target = targetSpan;

  const categoryMap = {
    'TENSE': 'কাল / Tense',
    'SPELLING': 'বানান / Spelling',
    'AGREEMENT': 'Subject-Verb মিল',
    'PUNCTUATION': 'বিরামচিহ্ন / Punctuation',
    'WORD_CHOICE': 'শব্দ নির্বাচন',
    'ARTICLES': 'Article',
    'PREPOSITIONS': 'Preposition',
    'HYPHENATION': 'Hyphen',
    'OTHER': 'ব্যাকরণ / Grammar'
  };
  const catKey = (category || '').trim().toUpperCase();
  const catLabel = categoryMap[catKey] || (category || 'ব্যাকরণ').replace(/_/g, ' ');

  popover.innerHTML = `
    <div class="grammar-popover-header">
      <div class="grammar-popover-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>${escapeHtml(catLabel)}</span>
      </div>
      <button type="button" class="grammar-popover-close" aria-label="Close">✕</button>
    </div>
    <div class="grammar-popover-msg">${escapeHtml(message || 'ব্যাকরণের ব্যাখ্যা')}</div>
  `;

  document.body.appendChild(popover);
  activeGrammarPopover = popover;

  const rect = targetSpan.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  // Position above the green word by default
  let top = rect.top - 10;
  let isBelow = false;
  if (top - popoverRect.height < 10) {
    top = rect.bottom + 10;
    isBelow = true;
    popover.classList.add('popover-arrow-top');
  } else {
    popover.classList.add('popover-arrow-bottom');
  }

  let left = rect.left + (rect.width / 2);
  const margin = 14;
  const halfWidth = popoverRect.width / 2;
  if (left - halfWidth < margin) {
    left = margin + halfWidth;
  } else if (left + halfWidth > window.innerWidth - margin) {
    left = window.innerWidth - margin - halfWidth;
  }

  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;
  popover.style.transform = isBelow ? 'translate(-50%, 0)' : 'translate(-50%, -100%)';

  const closeBtn = popover.querySelector('.grammar-popover-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllGrammarPopovers();
    });
  }

  requestAnimationFrame(() => {
    popover.classList.add('show');
  });
}

function buildGrammarDiffHtml(originalText, correctedText, corrections) {
  if (!originalText) return '';
  if (!corrections || !corrections.length) return escapeHtml(originalText);

  const matches = [];
  const origLower = originalText.toLowerCase();

  for (const c of corrections) {
    const mistake = (c.mistake || '').trim();
    if (!mistake) continue;

    const mLower = mistake.toLowerCase();
    let idx = origLower.indexOf(mLower);
    if (idx === -1) {
      const stripped = mLower.replace(/^[.,!?;:"'()]+|[.,!?;:"'()]+$/g, '');
      if (stripped) {
        idx = origLower.indexOf(stripped);
      }
    }

    if (idx !== -1) {
      matches.push({
        index: idx,
        length: mistake.length,
        mistake: originalText.slice(idx, idx + mistake.length),
        correction: c.correction || '',
        message: c.message || 'Grammar correction',
        category: c.category || 'GRAMMAR'
      });
    }
  }

  matches.sort((a, b) => a.index - b.index);

  let cursor = 0;
  let html = '';

  for (const m of matches) {
    if (m.index < cursor) {
      continue;
    }

    html += escapeHtml(originalText.slice(cursor, m.index));

    const rawM = m.mistake.trim();
    const rawC = m.correction.trim();
    const cleanM = rawM.toLowerCase().replace(/[.,!?;:]/g, '');
    const cleanC = rawC.toLowerCase().replace(/[.,!?;:]/g, '');

    // Skip diff badges if mistake and correction are identical, or only differ by case/punctuation
    if (rawM === rawC || (cleanM === cleanC && cleanM !== '')) {
      html += escapeHtml(m.correction || m.mistake);
    } else if (cleanM === '' && cleanC === '') {
      // Pure punctuation spacing (e.g. " ?" -> "?"): render cleanly without diff badges
      html += escapeHtml(m.correction);
    } else {
      const safeMsg = escapeHtml(m.message).replace(/"/g, '&quot;');
      const safeCat = escapeHtml(m.category).replace(/"/g, '&quot;');
      const safeMistake = escapeHtml(m.mistake);
      const safeCorrection = escapeHtml(m.correction);

      html += `<del class="grammar-inline-del">${safeMistake}</del> <span class="grammar-inline-ins" data-msg="${safeMsg}" data-cat="${safeCat}" role="button" tabindex="0" title="Click to view explanation">${safeCorrection}</span>`;
    }

    cursor = m.index + m.length;
  }

  html += escapeHtml(originalText.slice(cursor));

  if (correctedText && /[.!?]$/.test(correctedText) && !/[.!?]$/.test(html.trim())) {
    const endPunct = correctedText.trim().slice(-1);
    html += endPunct;
  }

  return html;
}

function toggleGrammarCheck() {
  grammarCheckEnabled = !grammarCheckEnabled;
  localStorage.setItem('chat_grammar_check_enabled', grammarCheckEnabled);
  updateGrammarCheckUI();
  showToast(grammarCheckEnabled ? 'Grammar Check enabled ✨' : 'Grammar Check disabled', 'info');

  if (!grammarCheckEnabled) {
    closeAllGrammarPopovers();
    document.querySelectorAll('.grammar-correction-bubble').forEach(b => b.remove());
  }
}

const pendingGrammarChecks = new Set();

function applyMessageEdit(messageId, correctedText, corrections = [], autoOpenExplanation = false, originalText = null) {
  if (!messageId || !correctedText) return;
  const row = document.querySelector(`.message-row[data-msg-id="${messageId}"]`);
  if (!row) return;

  const bubbleGroup = row.querySelector('.bubble-group');
  if (bubbleGroup) {
    const existingBubble = bubbleGroup.querySelector('.grammar-correction-bubble, .message-grammar-card');
    if (existingBubble) {
      existingBubble.remove();
    }
  }

  const bubble = row.querySelector('.bubble:not(.grammar-correction-bubble)');
  if (!bubble) return;

  const textSpan = bubble.querySelector('.bubble-text-content');
  if (!textSpan) return;

  // Store corrections and original text on the row
  row.__grammarCorrections = corrections || [];
  row.__correctedText = correctedText;
  if (originalText) row.__originalText = originalText;

  // Display previous error in red and fix in green directly inside this message bubble!
  if (corrections && corrections.length > 0) {
    const orig = originalText || row.__originalText || textSpan.textContent;
    textSpan.innerHTML = buildGrammarDiffHtml(orig, correctedText, corrections);
    textSpan.classList.remove('only-emojis', 'only-single-emoji');

    // Attach click listeners to green corrected words to open the Bangla explanation popover
    textSpan.querySelectorAll('.grammar-inline-ins').forEach((ins) => {
      ins.addEventListener('click', (e) => {
        e.stopPropagation();
        const msg = ins.getAttribute('data-msg') || 'Grammar correction';
        const cat = ins.getAttribute('data-cat') || 'Grammar';
        showGrammarExplanation(ins, msg, cat);
      });
      ins.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          ins.click();
        }
      });
    });
  } else {
    textSpan.innerHTML = renderEmojiHtml(correctedText);
    if (isOnlyEmojis(correctedText)) {
      const cnt = getEmojiCount(correctedText);
      textSpan.classList.add('only-emojis');
      if (cnt === 1) textSpan.classList.add('only-single-emoji');
    } else {
      textSpan.classList.remove('only-emojis', 'only-single-emoji');
    }
  }

  // Remove any redundant edited tag since the red/green inline styling indicates correction
  const oldTag = bubble.querySelector('.msg-edited-tag');
  if (oldTag) oldTag.remove();

  // Brief visual highlight on the row
  row.classList.remove('message-highlight-pulse');
  void row.offsetWidth;
  row.classList.add('message-highlight-pulse');
  setTimeout(() => row.classList.remove('message-highlight-pulse'), 1200);

  // If latest message in active chat, update chat list card preview
  if (lastConversationMessage && (!lastConversationMessage.id || lastConversationMessage.id === messageId)) {
    lastConversationMessage.text = correctedText;
    updateChatsListCardUI();
  }

  // Auto-open explanation popover on the first green correction if requested
  if (autoOpenExplanation && corrections && corrections.length > 0) {
    const firstIns = textSpan.querySelector('.grammar-inline-ins');
    if (firstIns) {
      const msg = firstIns.getAttribute('data-msg') || 'Grammar correction';
      const cat = firstIns.getAttribute('data-cat') || 'Grammar';
      setTimeout(() => {
        showGrammarExplanation(firstIns, msg, cat);
      }, 150);
    }
  }
}

async function checkAndShowMessageGrammar(messageId, text, type = 'outgoing', timeStr = null, autoOpenExplanation = false) {
  if (!text) return;
  const trimmed = text.trim();
  // Rate-limit safeguard: skip short trivial words, pure links, or emojis
  if (trimmed.length < 3 || /^https?:\/\//i.test(trimmed) || (typeof isOnlyEmojis === 'function' && isOnlyEmojis(trimmed))) {
    if (autoOpenExplanation) {
      showToast('খুব ছোট টেক্সট বা ইমোজির জন্য ব্যাকরণ পরীক্ষা প্রযোজ্য নয়', 'info');
    }
    return;
  }

  if (messageId && pendingGrammarChecks.has(messageId)) return;
  if (messageId) pendingGrammarChecks.add(messageId);

  const row = document.querySelector(`.message-row[data-msg-id="${messageId}"]`);
  const bubbleGroup = row ? row.querySelector('.bubble-group') : null;
  const originalBubble = bubbleGroup ? bubbleGroup.querySelector('.bubble:not(.grammar-correction-bubble)') : null;

  if (autoOpenExplanation && originalBubble) {
    originalBubble.classList.add('grammar-checking-pulse');
  }

  try {
    const res = await fetch('/api/grammar/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await res.json();

    if (originalBubble) {
      originalBubble.classList.remove('grammar-checking-pulse');
    }

    if (!data || data.status !== 'ok') {
      return;
    }

    // If text has no mistakes or no corrected text, do nothing
    if (!data.has_mistakes || !data.corrections || data.corrections.length === 0 || !data.corrected) {
      if (autoOpenExplanation) {
        showToast('এই বাক্যে কোনো ব্যাকরণগত ভুল পাওয়া যায়নি ✨', 'info');
      }
      return;
    }

    // Direct in-place edit on the sent message with red error and green fix (NO NEW MESSAGE ADDED!)
    applyMessageEdit(messageId, data.corrected, data.corrections, autoOpenExplanation, data.original || text);

    // Broadcast the edit to recipient and other connected devices
    wsSend({
      type: 'chat_edit',
      id: messageId,
      text: data.corrected,
      original: data.original || text,
      corrections: data.corrections
    }, true);
  } catch (err) {
    console.warn('[Grammar] check failed:', err);
    if (originalBubble) {
      originalBubble.classList.remove('grammar-checking-pulse');
    }
  } finally {
    if (messageId) pendingGrammarChecks.delete(messageId);
  }
}

function handleSend() {
  const text = chatInput.value.trim();
  if (!text) return;

  const clientTime = formatCurrentTime();
  const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  const replyPayload = activeReplyContext ? { ...activeReplyContext } : null;
  clearReplyContext();

  appendMessage(text, 'outgoing', clientTime, msgId, false, false, replyPayload);
  chatInput.value = '';
  lastLocalTextLength = 0;
  chatInput.dispatchEvent(new Event('input'));
  if (emojiPopover) emojiPopover.classList.remove('show');

  // Retain focus so virtual keyboard does not close
  keepInputFocused();

  // Ensure scroll is pinned to bottom after sending
  scrollToBottom();

  // Clear live typing preview on opponent's screen
  wsSend({ type: 'live_typing', text: '' });
  wsSend({ type: 'typing_stop' });
  clearTimeout(typingOutTimer);

  // Send the chat message (silently queued in background if offline)
  const payload = { type: 'chat', text, time: clientTime, id: msgId };
  if (replyPayload) {
    payload.reply_to = replyPayload;
  }
  wsSend(payload, true);

  // Automatically trigger emoji balloon animation if couple keywords are present
  triggerKeywordEmojiAnimations(text, true);

  // If Grammar Check is enabled, analyze the sent message
  if (grammarCheckEnabled && text) {
    checkAndShowMessageGrammar(msgId, text, 'outgoing', clientTime);
  }
}

// ─────────────────────────────────────────────────
//  Append Message Bubble
// ─────────────────────────────────────────────────
function appendMessage(content, type = 'outgoing', timeStr = null, messageId = null, isSeenOrStatus = false, skipScroll = false, replyTo = null) {
  if (messageId && document.querySelector(`#chatMessages .message-row[data-msg-id="${messageId}"]`)) {
    return;
  }
  const assignedId = messageId || ('msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7));
  const messageRow = document.createElement('div');
  messageRow.className = `message-row ${type}`;
  messageRow.dataset.msgId = assignedId;

  const isSeen = (isSeenOrStatus === true || isSeenOrStatus === 'seen');
  const statusStr = typeof isSeenOrStatus === 'string'
    ? isSeenOrStatus
    : (isSeen ? 'seen' : 'sent');

  lastConversationMessage = {
    text: content,
    msg_type: 'chat',
    time: timeStr || formatCurrentTime(),
    isOutgoing: type === 'outgoing',
    isSeen: isSeen
  };
  updateChatsListCardUI();

  const bubbleGroup = document.createElement('div');
  bubbleGroup.className = 'bubble-group';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';

  if (replyTo) {
    const quoteEl = createReplyQuoteElement(replyTo);
    if (quoteEl) {
      bubble.appendChild(quoteEl);
    }
  }

  const textSpan = document.createElement('span');
  textSpan.className = 'bubble-text-content';
  if (isOnlyEmojis(content)) {
    const cnt = getEmojiCount(content);
    textSpan.classList.add('only-emojis');
    if (cnt === 1) textSpan.classList.add('only-single-emoji');
  }
  textSpan.innerHTML = renderEmojiHtml(content);
  bubble.appendChild(textSpan);

  if (type === 'outgoing') {
    const statusWrap = document.createElement('div');
    statusWrap.innerHTML = getMessageStatusHtml(statusStr);
    if (statusWrap.firstElementChild) {
      bubble.appendChild(statusWrap.firstElementChild);
    }
  }

  const timeEl = document.createElement('div');
  timeEl.className = 'message-time';
  timeEl.textContent = timeStr || formatCurrentTime();

  bubbleGroup.appendChild(bubble);
  messageRow.appendChild(bubbleGroup);
  messageRow.appendChild(timeEl);

  if (type === 'incoming') {
    attachSwipeToReply(messageRow, {
      id: assignedId,
      sender: currentPartner ? currentPartner.name : 'Opponent',
      msgType: 'chat',
      text: content
    });
  }

  chatMessages.insertBefore(messageRow, typingIndicator);
  if (!skipScroll) {
    scrollToBottom();
  }
}

function scrollToBottom(forceInstant = false) {
  if (!chatMessages) return;

  chatMessages.scrollTop = chatMessages.scrollHeight;

  if (!forceInstant) {
    requestAnimationFrame(() => {
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });
  }
}

// ─────────────────────────────────────────────────
//  Input Focus Preservation Helper
// ─────────────────────────────────────────────────
let isClosingByAvatarClick = false;

function markMessageInteraction() {
  // Kept for backward compatibility
}

function keepInputFocused() {
  if (currentView !== 'conversation') return;
  if (chatInput && document.activeElement !== chatInput) {
    chatInput.focus({ preventScroll: true });
  }
}

// ─────────────────────────────────────────────────
//  Voice Messaging (Live WebSocket & Real Audio)
// ─────────────────────────────────────────────────
const MIC_ICON_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`;

const SEND_ICON_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

// Speech-pattern natural waveform (32 bars)
const DEFAULT_SPEECH_WAVEFORM = [
  6, 10, 16, 22, 14, 8, 12, 20, 26, 18, 12, 16, 24, 28, 20, 14, 18, 22, 26, 16, 10, 14, 22, 18, 12, 16, 20, 14, 8, 12, 16, 10
];

let currentlyPlayingVoiceAudio = null;
let currentlyPlayingVoiceReset = null;

function formatAudioSrc(src) {
  if (!src || typeof src !== 'string') return '';
  src = src.trim();
  // Strip codec attributes like ;codecs=opus that prevent playback on some browsers
  if (src.startsWith('data:audio/') && src.includes(';codecs=')) {
    src = src.replace(/;codecs=[^;,\s]+/, '');
  }
  if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/') || src.startsWith('blob:')) {
    return src;
  }
  return `data:audio/webm;base64,${src}`;
}

function appendVoiceMessage(audioData, seconds, type = 'outgoing', timeStr = null, messageId = null, customWaveform = null, isSeenOrStatus = false, skipScroll = false, replyTo = null) {
  if (messageId && document.querySelector(`#chatMessages .message-row[data-msg-id="${messageId}"]`)) {
    return;
  }

  const assignedId = messageId || ('voice_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7));
  const durationSec = Math.max(1, Math.round(Number(seconds) || 1));
  const durationText = formatDuration(durationSec);
  const messageRow = document.createElement('div');
  messageRow.className = `message-row ${type}`;
  messageRow.dataset.msgId = assignedId;

  const isSeen = (isSeenOrStatus === true || isSeenOrStatus === 'seen');
  const statusStr = typeof isSeenOrStatus === 'string'
    ? isSeenOrStatus
    : (isSeen ? 'seen' : 'sent');

  lastConversationMessage = {
    text: 'Voice note',
    msg_type: 'voice',
    media_duration: durationSec,
    time: timeStr || formatCurrentTime(),
    isOutgoing: type === 'outgoing',
    isSeen: isSeen
  };
  updateChatsListCardUI();

  const bubbleGroup = document.createElement('div');
  bubbleGroup.className = 'bubble-group';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';

  if (replyTo) {
    const quoteEl = createReplyQuoteElement(replyTo);
    if (quoteEl) {
      bubble.appendChild(quoteEl);
    }
  }

  // Build 32 waveform bars (from custom mic samples or realistic speech contour)
  let barHeights = DEFAULT_SPEECH_WAVEFORM;
  if (Array.isArray(customWaveform) && customWaveform.length >= 8) {
    barHeights = customWaveform;
  }
  const barsHtml = barHeights.map(h => `<span class="waveform-bar" style="height:${Math.max(4, Math.min(26, h))}px;"></span>`).join('');

  const voiceBubbleHtml = `
    <div class="voice-bubble">
      <button class="voice-play-btn" type="button" aria-label="Play Voice Note" title="Play">
        <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="6 4 19 12 6 20 6 4"></polygon>
        </svg>
        <svg class="pause-icon" style="display:none;" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      </button>
      <div class="voice-waveform" title="Click to seek">${barsHtml}</div>
      <span class="voice-duration">${durationText}</span>
    </div>`;

  const voiceWrap = document.createElement('div');
  voiceWrap.innerHTML = voiceBubbleHtml;
  bubble.appendChild(voiceWrap.firstElementChild);

  if (type === 'outgoing') {
    const statusWrap = document.createElement('div');
    statusWrap.innerHTML = getMessageStatusHtml(statusStr);
    if (statusWrap.firstElementChild) {
      bubble.appendChild(statusWrap.firstElementChild);
    }
  }

  const timeEl = document.createElement('div');
  timeEl.className = 'message-time';
  timeEl.textContent = timeStr || formatCurrentTime();

  bubbleGroup.appendChild(bubble);
  messageRow.appendChild(bubbleGroup);
  messageRow.appendChild(timeEl);

  if (type === 'incoming') {
    attachSwipeToReply(messageRow, {
      id: assignedId,
      sender: currentPartner ? currentPartner.name : 'Opponent',
      msgType: 'voice',
      mediaDuration: durationSec,
      text: `🎙️ Voice message (${durationText})`
    });
  }

  chatMessages.insertBefore(messageRow, typingIndicator);
  if (!skipScroll) {
    scrollToBottom();
  }

  const voiceBubble        = bubble.querySelector('.voice-bubble');
  const playBtn            = bubble.querySelector('.voice-play-btn');
  const playIcon           = bubble.querySelector('.play-icon');
  const pauseIcon          = bubble.querySelector('.pause-icon');
  const durationEl         = bubble.querySelector('.voice-duration');
  const waveformContainer  = bubble.querySelector('.voice-waveform');
  const waveformBars       = bubble.querySelectorAll('.waveform-bar');

  const cleanAudioSrc = formatAudioSrc(audioData);
  let audio = null;

  function initAudio() {
    if (!audio && cleanAudioSrc) {
      try {
        audio = new Audio(cleanAudioSrc);
        audio.preload = 'metadata';
        setupAudioListeners();
      } catch (e) {
        console.warn('[Voice] Audio init failed:', e);
      }
    }
  }

  function resetAudioUI() {
    voiceBubble.classList.remove('playing');
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    durationEl.textContent = durationText;
    waveformBars.forEach(b => b.classList.remove('played'));
    if (currentlyPlayingVoiceAudio === audio) {
      currentlyPlayingVoiceAudio = null;
      currentlyPlayingVoiceReset = null;
    }
  }

  function setupAudioListeners() {
    if (!audio) return;

    audio.addEventListener('timeupdate', () => {
      const dur = audio.duration && !isNaN(audio.duration) ? audio.duration : durationSec;
      const progress = Math.min(1, Math.max(0, audio.currentTime / dur));
      const activeBarCount = Math.floor(progress * waveformBars.length);
      waveformBars.forEach((bar, idx) => {
        bar.classList.toggle('played', idx <= activeBarCount);
      });
      durationEl.textContent = formatDuration(Math.floor(audio.currentTime));
    });

    audio.addEventListener('ended', resetAudioUI);

    audio.addEventListener('pause', () => {
      if (!audio.ended) {
        voiceBubble.classList.remove('playing');
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    });

    audio.addEventListener('error', () => {
      resetAudioUI();
      showToast('Could not play voice note', 'error');
    });
  }

  if (cleanAudioSrc) {
    initAudio();
  }

  // Interactive Click-to-Seek on waveform
  waveformContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!audio) initAudio();
    if (!audio) return;
    const rect = waveformContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, clickX / rect.width));
    const dur = audio.duration && !isNaN(audio.duration) ? audio.duration : durationSec;
    audio.currentTime = progress * dur;
    durationEl.textContent = formatDuration(Math.floor(audio.currentTime));

    const activeBarCount = Math.floor(progress * waveformBars.length);
    waveformBars.forEach((bar, idx) => {
      bar.classList.toggle('played', idx <= activeBarCount);
    });

    if (audio.paused) {
      playBtn.click();
    }
  });

  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!audio) initAudio();
    if (!audio) {
      showToast('No audio stream available', 'error');
      return;
    }

    if (audio.paused) {
      if (currentlyPlayingVoiceAudio && currentlyPlayingVoiceAudio !== audio) {
        try { currentlyPlayingVoiceAudio.pause(); } catch (_) {}
        if (currentlyPlayingVoiceReset) currentlyPlayingVoiceReset();
      }

      currentlyPlayingVoiceAudio = audio;
      currentlyPlayingVoiceReset = resetAudioUI;

      audio.play().then(() => {
        voiceBubble.classList.add('playing');
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      }).catch(err => {
        console.warn('[Voice] Play error:', err);
        resetAudioUI();
        showToast('Playback permission or format error', 'error');
      });
    } else {
      audio.pause();
      voiceBubble.classList.remove('playing');
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  });

  // Tapping voiceBubble toggles play/pause smoothly
  voiceBubble.addEventListener('click', (e) => {
    if (e.target.closest('.voice-waveform') || e.target.closest('.voice-play-btn')) return;
    playBtn.click();
  });
}

function receiveIncomingVoice(audioData, duration, timeStr, messageId = null, waveform = null, replyTo = null) {
  hideOpponentTyping();

  if (messageId && document.querySelector(`#chatMessages .message-row[data-msg-id="${messageId}"]`)) {
    return;
  }

  const cleanAudio = formatAudioSrc(audioData);
  const finalDuration = Math.max(1, Math.round(Number(duration) || 1));

  lastConversationMessage = {
    text: 'Voice note',
    msg_type: 'voice',
    media_duration: finalDuration,
    time: timeStr || formatCurrentTime(),
    isOutgoing: false,
    isSeen: currentView === 'conversation'
  };
  updateChatsListCardUI();

  playOpponentKeypressSound();
  appendVoiceMessage(cleanAudio, finalDuration, 'incoming', timeStr, messageId, waveform, false, false, replyTo);

  if (activeUser && currentPartner && currentPartner.key && messageId) {
    notifyMessageSeen(messageId);
  }
}

// ─────────────────────────────────────────────────
//  Image Handling & Fullscreen Lightbox
// ─────────────────────────────────────────────────
function openImageLightbox(src) {
  if (!imageLightbox || !lightboxImage || !src) return;
  lightboxImage.src = src;
  imageLightbox.style.display = 'flex';
  imageLightbox.setAttribute('aria-hidden', 'false');
}

function closeImageLightbox() {
  if (!imageLightbox) return;
  imageLightbox.style.display = 'none';
  imageLightbox.setAttribute('aria-hidden', 'true');
  if (lightboxImage) lightboxImage.src = '';
}

function compressImage(file, maxDimension = 1280, quality = 0.84) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function handleSendImage(file) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('Please select an image file', 'error');
    return;
  }

  try {
    showToast('Sending photo...', 'info');
    const compressedDataUrl = await compressImage(file);
    const clientTime = formatCurrentTime();
    const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    const replyPayload = activeReplyContext ? { ...activeReplyContext } : null;
    clearReplyContext();

    // 1. Render in sender's own chat
    appendImageMessage(compressedDataUrl, 'outgoing', clientTime, msgId, false, false, replyPayload);

    // 2. Broadcast via WebSocket (silently queued in background if offline)
    const payload = {
      type: 'image',
      image: compressedDataUrl,
      time: clientTime,
      id: msgId
    };
    if (replyPayload) {
      payload.reply_to = replyPayload;
    }
    wsSend(payload, true);
  } catch (err) {
    console.error('[Image] Failed to process image:', err);
    showToast('Failed to send image', 'error');
  }
}

function appendImageMessage(imageUrl, type = 'outgoing', timeStr = null, messageId = null, isSeenOrStatus = false, skipScroll = false, replyTo = null) {
  if (messageId && document.querySelector(`#chatMessages .message-row[data-msg-id="${messageId}"]`)) {
    return;
  }
  const assignedId = messageId || ('msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7));
  const messageRow = document.createElement('div');
  messageRow.className = `message-row ${type}`;
  messageRow.dataset.msgId = assignedId;

  const isSeen = (isSeenOrStatus === true || isSeenOrStatus === 'seen');
  const statusStr = typeof isSeenOrStatus === 'string'
    ? isSeenOrStatus
    : (isSeen ? 'seen' : 'sent');

  lastConversationMessage = {
    text: 'Photo',
    msg_type: 'image',
    time: timeStr || formatCurrentTime(),
    isOutgoing: type === 'outgoing',
    isSeen: isSeen
  };
  updateChatsListCardUI();

  const bubbleGroup = document.createElement('div');
  bubbleGroup.className = 'bubble-group';

  const bubble = document.createElement('div');
  bubble.className = 'bubble image-bubble';

  if (replyTo) {
    const quoteEl = createReplyQuoteElement(replyTo);
    if (quoteEl) {
      bubble.appendChild(quoteEl);
    }
  }

  const container = document.createElement('div');
  container.className = 'image-container';

  const img = document.createElement('img');
  img.className = 'chat-image-preview';
  img.src = imageUrl;
  img.alt = 'Shared photo';
  img.loading = 'lazy';

  img.onload = () => {
    if (!skipScroll) {
      scrollToBottom();
    }
  };

  img.addEventListener('click', (e) => {
    e.stopPropagation();
    openImageLightbox(imageUrl);
  });

  container.appendChild(img);
  bubble.appendChild(container);

  if (type === 'outgoing') {
    const statusWrap = document.createElement('div');
    statusWrap.innerHTML = getMessageStatusHtml(statusStr);
    if (statusWrap.firstElementChild) {
      bubble.appendChild(statusWrap.firstElementChild);
    }
  }

  const timeEl = document.createElement('div');
  timeEl.className = 'message-time';
  timeEl.textContent = timeStr || formatCurrentTime();

  bubbleGroup.appendChild(bubble);
  messageRow.appendChild(bubbleGroup);
  messageRow.appendChild(timeEl);

  if (type === 'incoming') {
    attachSwipeToReply(messageRow, {
      id: assignedId,
      sender: currentPartner ? currentPartner.name : 'Opponent',
      msgType: 'image',
      imageUrl: imageUrl,
      text: '📷 Photo'
    });
  }

  chatMessages.insertBefore(messageRow, typingIndicator);
  if (!skipScroll) {
    scrollToBottom();
  }
}

function receiveIncomingImage(imageUrl, timeStr, messageId = null, replyTo = null) {
  hideOpponentTyping();

  if (messageId && document.querySelector(`#chatMessages .message-row[data-msg-id="${messageId}"]`)) {
    return;
  }

  const assignedId = messageId || ('msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7));

  lastConversationMessage = {
    text: 'Photo',
    msg_type: 'image',
    time: timeStr || formatCurrentTime(),
    isOutgoing: false,
    isSeen: currentView === 'conversation'
  };
  updateChatsListCardUI();

  playOpponentKeypressSound();
  appendImageMessage(imageUrl, 'incoming', timeStr, assignedId, false, false, replyTo);

  if (activeUser && currentPartner.key) {
    notifyMessageSeen(assignedId);
  }
}

// ─────────────────────────────────────────────────
//  Voice Recording (MediaRecorder & Live WebSocket)
// ─────────────────────────────────────────────────
let mediaRecorder = null;
let audioChunks = [];
let recordStream = null;
let recordingInterval = null;
let recordingSeconds = 0;
let isRecording = false;
let isRecordCancelled = false;

// Real-time audio analyser for microphone volume reactivity
let micAnalyser = null;
let micSource = null;
let micAnimFrame = null;
let recordedWaveformSamples = [];

function startLiveMicVisualizer(stream) {
  recordedWaveformSamples = [];
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    micSource = ctx.createMediaStreamSource(stream);
    micAnalyser = ctx.createAnalyser();
    micAnalyser.fftSize = 64;
    micAnalyser.smoothingTimeConstant = 0.65;
    micSource.connect(micAnalyser);

    const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);
    const liveSpans = document.querySelectorAll('.recording-live-waveform span');

    function drawWave() {
      if (!isRecording) return;
      micAnalyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avg = sum / dataArray.length;

      // Sample volume periodically for natural chat bubble waveform contour
      if (Math.random() < 0.25) {
        const normH = Math.round(5 + (avg / 128) * 20);
        recordedWaveformSamples.push(normH);
      }

      if (liveSpans.length > 0) {
        liveSpans.forEach((span, i) => {
          const bin = Math.min(dataArray.length - 1, i * 2);
          const val = dataArray[bin] || avg;
          const h = Math.max(4, Math.min(22, (val / 255) * 22));
          span.style.height = `${h}px`;
        });
      }

      micAnimFrame = requestAnimationFrame(drawWave);
    }

    micAnimFrame = requestAnimationFrame(drawWave);
  } catch (err) {
    console.warn('[Visualizer] Mic visualizer init error:', err);
  }
}

function stopLiveMicVisualizer() {
  if (micAnimFrame) {
    cancelAnimationFrame(micAnimFrame);
    micAnimFrame = null;
  }
  if (micSource) {
    try { micSource.disconnect(); } catch (_) {}
    micSource = null;
  }
  if (micAnalyser) {
    try { micAnalyser.disconnect(); } catch (_) {}
    micAnalyser = null;
  }
  const liveSpans = document.querySelectorAll('.recording-live-waveform span');
  liveSpans.forEach(span => { span.style.height = ''; });
}

function getRecordedWaveformContour() {
  const targetCount = 32;
  if (recordedWaveformSamples.length >= 8) {
    const res = [];
    const step = recordedWaveformSamples.length / targetCount;
    for (let i = 0; i < targetCount; i++) {
      const idx = Math.min(recordedWaveformSamples.length - 1, Math.floor(i * step));
      res.push(Math.max(5, Math.min(26, recordedWaveformSamples[idx])));
    }
    return res;
  }
  return DEFAULT_SPEECH_WAVEFORM;
}

function getSupportedAudioMimeType() {
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/ogg',
    'audio/mp4',
    'audio/aac'
  ];
  for (const t of types) {
    if (window.MediaRecorder && MediaRecorder.isTypeSupported(t)) {
      return t;
    }
  }
  return '';
}

async function startVoiceRecording() {
  if (isRecording) return;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast('Microphone access is not supported by your browser', 'error');
    return;
  }

  try {
    recordStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    console.error('[Voice] Mic access denied:', err);
    showToast('Microphone permission denied or unavailable', 'error');
    return;
  }

  const mimeType = getSupportedAudioMimeType();
  const options = mimeType ? { mimeType } : {};

  try {
    mediaRecorder = new MediaRecorder(recordStream, options);
  } catch (err) {
    try {
      mediaRecorder = new MediaRecorder(recordStream);
    } catch (e) {
      console.error('[Voice] MediaRecorder init error:', e);
      showToast('Could not initialize audio recorder', 'error');
      if (recordStream) recordStream.getTracks().forEach(t => t.stop());
      recordStream = null;
      return;
    }
  }

  audioChunks = [];
  isRecording = true;
  isRecordCancelled = false;
  recordingSeconds = 0;

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      audioChunks.push(e.data);
    }
  };

  mediaRecorder.onstop = () => {
    stopLiveMicVisualizer();

    if (recordStream) {
      recordStream.getTracks().forEach(t => t.stop());
      recordStream = null;
    }

    if (isRecordCancelled) {
      audioChunks = [];
      return;
    }

    if (audioChunks.length === 0) {
      return;
    }

    const recordedMimeType = (mediaRecorder && mediaRecorder.mimeType) || mimeType || 'audio/webm';
    const audioBlob = new Blob(audioChunks, { type: recordedMimeType });
    audioChunks = [];

    const finalDuration = Math.max(1, recordingSeconds);
    const waveformContour = getRecordedWaveformContour();

    const reader = new FileReader();
    reader.onloadend = () => {
      let base64Audio = reader.result;
      if (typeof base64Audio === 'string') {
        base64Audio = formatAudioSrc(base64Audio);
      }
      const clientTime = formatCurrentTime();
      const voiceMsgId = 'voice_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
      const replyPayload = activeReplyContext ? { ...activeReplyContext } : null;
      clearReplyContext();

      appendVoiceMessage(base64Audio, finalDuration, 'outgoing', clientTime, voiceMsgId, waveformContour, false, false, replyPayload);

      // Sent via live WebSocket & persisted (silently queued in background if offline)
      const payload = {
        type: 'voice',
        audio: base64Audio,
        duration: finalDuration,
        waveform: waveformContour,
        time: clientTime,
        id: voiceMsgId
      };
      if (replyPayload) {
        payload.reply_to = replyPayload;
      }
      wsSend(payload, true);
    };
    reader.readAsDataURL(audioBlob);
  };

  mediaRecorder.start(200);

  // Start real-time audio visualizer on recording bars
  startLiveMicVisualizer(recordStream);

  if (recordingTimer) recordingTimer.textContent = '0:00';
  if (inputNormalContent) {
    inputNormalContent.style.opacity = '0';
    inputNormalContent.style.pointerEvents = 'none';
  }
  if (inputRecordingContent) inputRecordingContent.style.display = 'flex';
  chatInput.focus({ preventScroll: true });

  updateActionBtnState();

  clearInterval(recordingInterval);
  recordingInterval = setInterval(() => {
    recordingSeconds++;
    if (recordingTimer) {
      recordingTimer.textContent = formatDuration(recordingSeconds);
    }
  }, 1000);
}

function stopAndSendVoiceRecording() {
  if (!isRecording) return;
  clearInterval(recordingInterval);
  isRecording = false;
  isRecordCancelled = false;

  stopLiveMicVisualizer();
  resetRecordingUI();

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
}

function cancelVoiceRecording() {
  if (!isRecording) return;
  clearInterval(recordingInterval);
  isRecording = false;
  isRecordCancelled = true;

  stopLiveMicVisualizer();
  resetRecordingUI();

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  } else if (recordStream) {
    recordStream.getTracks().forEach(t => t.stop());
    recordStream = null;
  }
  showToast('Recording cancelled', 'info');
}

function resetRecordingUI() {
  if (inputRecordingContent) inputRecordingContent.style.display = 'none';
  if (inputNormalContent) {
    inputNormalContent.style.opacity = '1';
    inputNormalContent.style.pointerEvents = 'auto';
  }
  updateActionBtnState();
  keepInputFocused();
}

function updateActionBtnState() {
  if (!actionBtn || !actionIcon) return;
  actionBtn.classList.remove('recording-active', 'mic-mode');
  actionBtn.classList.add('send-mode');
  actionBtn.title = 'Send';
  actionBtn.setAttribute('aria-label', 'Send message');
  actionIcon.innerHTML = SEND_ICON_SVG;
}

// ─────────────────────────────────────────────────
//  Avatar / Presence UI
// ─────────────────────────────────────────────────
function applyOpponentProfile(url, name) {
  if (userNameEl)  userNameEl.textContent = name;
  currentPartner.avatar = url;
  currentPartner.name   = name;

  if (avatarImg) {
    avatarImg.style.opacity = '0.3';
    const tmp = new Image();
    tmp.onload  = () => { avatarImg.src = url; avatarImg.style.opacity = '1'; };
    tmp.onerror = () => { avatarImg.style.opacity = '1'; };
    tmp.src = url;
  }
}

// ─────────────────────────────────────────────────
//  Event Listeners Setup
// ─────────────────────────────────────────────────
function setupEventListeners() {
  // Dismiss virtual keyboard ONLY when clicking on opponent user profile picture
  const opponentAvatarWrapper = document.getElementById('avatarWrapper');
  const headerLeftArea = document.querySelector('.header-left');
  const handleAvatarDismiss = (e) => {
    if (document.activeElement === chatInput) {
      isClosingByAvatarClick = true;
      chatInput.blur();
      inputPill.classList.remove('focused');
      setTimeout(() => {
        isClosingByAvatarClick = false;
      }, 500);
    }
  };

  if (opponentAvatarWrapper) {
    opponentAvatarWrapper.addEventListener('pointerdown', () => {
      if (document.activeElement === chatInput) isClosingByAvatarClick = true;
    });
    opponentAvatarWrapper.addEventListener('click', handleAvatarDismiss);
    opponentAvatarWrapper.addEventListener('touchend', handleAvatarDismiss);
  } else if (headerLeftArea) {
    headerLeftArea.addEventListener('pointerdown', () => {
      if (document.activeElement === chatInput) isClosingByAvatarClick = true;
    });
    headerLeftArea.addEventListener('click', handleAvatarDismiss);
    headerLeftArea.addEventListener('touchend', handleAvatarDismiss);
  }

  // Prevent chat messages or blank space from dismissing keyboard
  if (chatMessages) {
    chatMessages.addEventListener('pointerdown', (e) => {
      if (document.activeElement === chatInput && !e.target.closest('.voice-play-btn, .reply-preview-close-btn, .reply-quote-chip')) {
        e.preventDefault();
        keepInputFocused();
      }
    });

    chatMessages.addEventListener('mousedown', (e) => {
      if (document.activeElement === chatInput && !e.target.closest('.voice-play-btn, .reply-preview-close-btn, .reply-quote-chip')) {
        e.preventDefault();
        keepInputFocused();
      }
    });

    chatMessages.addEventListener('touchstart', (e) => {
      if (document.activeElement === chatInput && !e.target.closest('.reply-preview-close-btn, .reply-quote-chip')) {
        keepInputFocused();
      }
    }, { passive: true });
  }

  // Reply preview close button
  if (replyPreviewCloseBtn) {
    replyPreviewCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearReplyContext();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeReplyContext) {
      clearReplyContext();
    }
  });

  // Sound toggle (syncs both Chats screen and Conversation screen)
  function updateGlobalSoundUI() {
    [soundToggleBtn, chatsSoundToggleBtn].forEach(btn => {
      if (!btn) return;
      const onIcon  = btn.querySelector('.sound-on-icon');
      const offIcon = btn.querySelector('.sound-off-icon');
      btn.classList.toggle('muted', !soundEnabled);
      if (onIcon)  onIcon.style.display  = soundEnabled ? 'block' : 'none';
      if (offIcon) offIcon.style.display = soundEnabled ? 'none'  : 'block';
      btn.title = soundEnabled ? 'Typing sound ON (click to mute)' : 'Typing sound OFF (click to enable)';
    });
  }
  updateGlobalSoundUI();

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('chat_typing_sound', soundEnabled);
      updateGlobalSoundUI();
      if (soundEnabled) {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
        playKeypressSound();
      }
    });
  }

  if (chatsSoundToggleBtn) {
    chatsSoundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('chat_typing_sound', soundEnabled);
      updateGlobalSoundUI();
    });
  }

  // Quick Love Blast action
  if (loveBlastBtn) {
    const ROMANTIC_BURST_EMOJIS = ['💋', '🫦', '❤️‍🔥', '🥵', '😘', '🥰', '😍', '🌹', '💖', '💘', '😏', '💕', '🍓', '🫂'];
    loveBlastBtn.addEventListener('click', (e) => {
      e.preventDefault();
      markMessageInteraction();
      const randomEmoji = ROMANTIC_BURST_EMOJIS[Math.floor(Math.random() * ROMANTIC_BURST_EMOJIS.length)];
      const sent = sendFlyingEmojiBalloon(randomEmoji);
      if (sent) {
        loveBlastBtn.style.transform = 'scale(1.2) rotate(-12deg)';
        setTimeout(() => { loveBlastBtn.style.transform = ''; }, 250);
        showToast('Love sent ❤️‍🔥', 'success');
      }
      keepInputFocused();
    });
  }

  // Input — send live typing events in real time
  function sendLiveTypingEvent() {
    if (currentView !== 'conversation') return;
    const rawVal = chatInput.value;
    updateActionBtnState();

    // Play subtle typing sound for local keystrokes when mute is off
    if (rawVal.length !== lastLocalTextLength) {
      if (rawVal.length > 0) {
        playKeypressSound();
      }
      lastLocalTextLength = rawVal.length;
    }

    // Stream keystrokes live to opponent before message is sent
    if (rawVal.length > 0) {
      wsSend({ type: 'live_typing', text: rawVal });
      wsSend({ type: 'typing_start' });
      clearTimeout(typingOutTimer);
      typingOutTimer = setTimeout(() => {
        wsSend({ type: 'live_typing', text: '' });
        wsSend({ type: 'typing_stop' });
      }, 4000);
    } else {
      clearTimeout(typingOutTimer);
      wsSend({ type: 'live_typing', text: '' });
      wsSend({ type: 'typing_stop' });
    }
  }

  chatInput.addEventListener('input', () => {
    if (currentView !== 'conversation') return;
    sendLiveTypingEvent();
  });

  // Helper to send message while keeping focus on input (keeps mobile keyboard open)
  function executeSend() {
    if (currentView !== 'conversation') return;
    markMessageInteraction();
    if (chatInput.value.trim()) {
      handleSend();
      chatInput.focus({ preventScroll: true });
      scrollToBottom();
      setTimeout(() => { 
        if (currentView === 'conversation') {
          scrollToBottom();
        }
      }, 60);
    }
  }

  // Enter to send (desktop and mobile virtual keyboards)
  chatInput.addEventListener('keydown', (e) => {
    if (currentView !== 'conversation') return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executeSend();
    }
  });

  // Action button handling (Mic by default, Send when text entered, Stop/Send when recording)
  let lastTouchActionTime = 0;

  actionBtn.addEventListener('pointerdown', (e) => {
    markMessageInteraction();
    e.preventDefault();
  });

  actionBtn.addEventListener('mousedown', (e) => {
    markMessageInteraction();
    e.preventDefault();
  });

  function handleActionBtnTrigger() {
    markMessageInteraction();
    if (chatInput && chatInput.value.trim()) {
      executeSend();
    } else if (chatInput) {
      chatInput.focus({ preventScroll: true });
    }
  }

  actionBtn.addEventListener('touchstart', (e) => {
    markMessageInteraction();
    e.preventDefault();
    lastTouchActionTime = Date.now();
    handleActionBtnTrigger();
  }, { passive: false });

  actionBtn.addEventListener('click', (e) => {
    markMessageInteraction();
    if (Date.now() - lastTouchActionTime < 500) {
      return; // Already handled by touchstart
    }
    handleActionBtnTrigger();
  });

  // Cancel voice recording
  if (cancelRecordBtn) {
    cancelRecordBtn.addEventListener('pointerdown', (e) => {
      markMessageInteraction();
      e.preventDefault();
    });
    cancelRecordBtn.addEventListener('mousedown', (e) => {
      markMessageInteraction();
      e.preventDefault();
    });
    cancelRecordBtn.addEventListener('touchstart', (e) => {
      markMessageInteraction();
      e.preventDefault();
      e.stopPropagation();
      cancelVoiceRecording();
      chatInput.focus({ preventScroll: true });
    }, { passive: false });

    cancelRecordBtn.addEventListener('click', (e) => {
      markMessageInteraction();
      e.stopPropagation();
      cancelVoiceRecording();
      chatInput.focus({ preventScroll: true });
    });
  }

  // Back to Chats List button
  if (chatBackBtn) {
    const handleBackClick = (e) => {
      if (e) e.preventDefault();
      isClosingByAvatarClick = true;
      if (chatInput) {
        chatInput.blur();
        chatInput.value = '';
        updateActionBtnState();
      }
      if (inputPill) inputPill.classList.remove('focused');
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
      showChatsList();
    };

    chatBackBtn.addEventListener('pointerdown', () => {
      isClosingByAvatarClick = true;
      if (chatInput) chatInput.blur();
    });

    chatBackBtn.addEventListener('touchstart', () => {
      isClosingByAvatarClick = true;
      if (chatInput) chatInput.blur();
    }, { passive: true });

    chatBackBtn.addEventListener('click', handleBackClick);
  }

  // Grammar Check Toggle Buttons
  if (grammarCheckToggleBtn) {
    grammarCheckToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleGrammarCheck();
    });
  }
  if (grammarBarToggleBtn) {
    grammarBarToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleGrammarCheck();
    });
  }
  updateGrammarCheckUI();

  // Lock app (from conversation or chats screen)
  if (lockAppBtn) lockAppBtn.addEventListener('click', lockApp);
  if (chatsLockAppBtn) chatsLockAppBtn.addEventListener('click', lockApp);

  // Search in chats list
  if (chatsSearchInput) {
    chatsSearchInput.addEventListener('input', (e) => {
      filterChatsList(e.target.value);
    });
  }

  if (chatsSearchClearBtn) {
    chatsSearchClearBtn.addEventListener('click', () => {
      if (chatsSearchInput) {
        chatsSearchInput.value = '';
        filterChatsList('');
        chatsSearchInput.focus();
      }
    });
  }

  // Clear chat (empties messages between users)
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', async () => {
      const partnerName = currentPartner.name || currentPartner.key || 'this user';
      if (!confirm(`Are you sure you want to clear chat messages with ${partnerName}?`)) {
        return;
      }
      try {
        const res = await authFetch('/api/messages/clear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ opponent: currentPartner.key })
        });
        if (res.ok) {
          if (currentPartner && currentPartner.key) {
            conversationMessagesCache.delete(currentPartner.key);
          }
          clearChatDOM();
          showToast('Conversation cleared ✓', 'info');
        } else {
          showToast('Failed to clear conversation', 'error');
        }
      } catch (err) {
        showToast('Error clearing chat', 'error');
      }
    });
  }

  // Multi-User Header & Directory Modals Listeners
  if (chatsHeaderProfileTrigger) {
    chatsHeaderProfileTrigger.addEventListener('click', openProfileModal);
  }
  if (chatsProfileBtn) {
    chatsProfileBtn.addEventListener('click', openProfileModal);
  }
  if (chatsNewChatBtn) {
    chatsNewChatBtn.addEventListener('click', openUsersModal);
  }
  if (chatsEmptyNewBtn) {
    chatsEmptyNewBtn.addEventListener('click', openUsersModal);
  }
  if (usersModalCloseBtn) {
    usersModalCloseBtn.addEventListener('click', closeUsersModal);
  }
  if (directorySearchInput) {
    directorySearchInput.addEventListener('input', (e) => {
      renderDirectoryList(e.target.value);
    });
  }
  if (profileModalCloseBtn) {
    profileModalCloseBtn.addEventListener('click', closeProfileModal);
  }
  if (profileSaveBtn) {
    profileSaveBtn.addEventListener('click', async () => {
      const name = profileDisplayNameInput ? profileDisplayNameInput.value.trim() : '';
      if (!name) return;
      try {
        const res = await authFetch('/api/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_name: name, avatar: selectedProfileAvatar || currentUserProfile.avatar })
        });
        const data = await res.json();
        if (res.ok && data.user) {
          currentUserProfile = data.user;
          initLoggedInSession(data.user);
          closeProfileModal();
          showToast('Profile updated ✓', 'info');
        }
      } catch (err) {
        showToast('Error updating profile', 'error');
      }
    });
  }
  if (profileChangePasskeyBtn) {
    profileChangePasskeyBtn.addEventListener('click', () => {
      closeProfileModal();
      openPasskeySetup(false);
    });
  }
  if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener('click', logoutUser);
  }

  // Emoji button & popover handling (debounced to avoid opening and instantly closing)
  let lastEmojiBtnTouchTime = 0;
  function handleEmojiBtnToggle(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    emojiPopover.classList.toggle('show');
    if (chatInput) {
      chatInput.focus({ preventScroll: true });
    }
  }

  if (emojiBtn) {
    emojiBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (chatInput) chatInput.focus({ preventScroll: true });
    });
    emojiBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (chatInput) chatInput.focus({ preventScroll: true });
    });
    emojiBtn.addEventListener('touchstart', (e) => {
      lastEmojiBtnTouchTime = Date.now();
      handleEmojiBtnToggle(e);
    }, { passive: false });
    emojiBtn.addEventListener('click', (e) => {
      if (Date.now() - lastEmojiBtnTouchTime < 400) return;
      handleEmojiBtnToggle(e);
    });
  }

  if (emojiPopover) {
    emojiPopover.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (chatInput) chatInput.focus({ preventScroll: true });
    });
    emojiPopover.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (chatInput) chatInput.focus({ preventScroll: true });
    });
    emojiPopover.addEventListener('touchstart', (e) => {
      if (chatInput) chatInput.focus({ preventScroll: true });
    }, { passive: true });

    let lastSingleEmojiTapTime = 0;
    document.querySelectorAll('.emoji-btn').forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (chatInput) chatInput.focus({ preventScroll: true });
      });
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (chatInput) chatInput.focus({ preventScroll: true });
      });

      const handleEmojiClick = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const now = Date.now();
        if (now - lastSingleEmojiTapTime < 400) return;
        lastSingleEmojiTapTime = now;

        const emojiChar = btn.dataset.emoji || btn.getAttribute('data-emoji') || (btn.querySelector('img.emoji')?.alt) || btn.textContent.trim();
        if (emojiChar) {
          sendFlyingEmojiBalloon(emojiChar);
        }
        if (chatInput) chatInput.focus({ preventScroll: true });
      };

      btn.addEventListener('touchstart', handleEmojiClick, { passive: false });
      btn.addEventListener('click', handleEmojiClick);
    });

    // Option inside emoji bar to choose and send photo
    const emojiImgBtn = emojiImageBtn || document.getElementById('emojiImageBtn');
    if (emojiImgBtn) {
      const handleEmojiImgTrigger = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (emojiPopover) emojiPopover.classList.remove('show');
        if (imageFileInput) {
          imageFileInput.click();
        }
      };
      emojiImgBtn.addEventListener('touchstart', handleEmojiImgTrigger, { passive: false });
      emojiImgBtn.addEventListener('click', handleEmojiImgTrigger);
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#emojiPopover') && !e.target.closest('#emojiBtn')) {
        if (Date.now() - lastEmojiBtnTouchTime < 400) return;
        if (emojiPopover) emojiPopover.classList.remove('show');
      }
    });
    document.addEventListener('touchend', (e) => {
      if (!e.target.closest('#emojiPopover') && !e.target.closest('#emojiBtn')) {
        if (Date.now() - lastEmojiBtnTouchTime < 400) return;
        if (emojiPopover) emojiPopover.classList.remove('show');
      }
    });
  }

  // ── Click Message to Toggle Timestamp & Show Bangla Grammar Explanation ──
  if (chatMessages) {
    chatMessages.addEventListener('click', (e) => {
      // Ignore clicks inside popovers or on interactive controls
      if (e.target.closest('.grammar-explanation-popover') || e.target.closest('.grammar-inline-ins')) {
        return;
      }

      const row = e.target.closest('.message-row');
      if (!row) {
        // Clicked outside messages (chat background): dismiss all open timestamps and popovers
        document.querySelectorAll('.message-row.show-time').forEach(el => el.classList.remove('show-time'));
        closeAllGrammarPopovers();
        return;
      }

      // Ignore clicks on specific interactive controls (voice play/seek, photo preview, reply quotes)
      if (e.target.closest('.voice-play-btn') || 
          e.target.closest('.voice-waveform') || 
          e.target.closest('.chat-image-preview') ||
          e.target.closest('.reply-quote-chip')) {
        return;
      }

      const isCurrentlyShown = row.classList.contains('show-time');

      // Close all other open timestamps so only the clicked message is active
      document.querySelectorAll('.message-row.show-time').forEach(el => {
        if (el !== row) el.classList.remove('show-time');
      });

      // Toggle timestamp on the clicked message
      row.classList.toggle('show-time', !isCurrentlyShown);

      // Keep input focused if it was active
      if (document.activeElement === chatInput) {
        keepInputFocused();
      }

      // ── CLICK ON ANY MESSAGE TO SHOW BANGLA GRAMMAR EXPLANATION ──
      const firstIns = row.querySelector('.grammar-inline-ins');
      if (firstIns) {
        if (activeGrammarPopover && activeGrammarPopover.__target === firstIns) {
          closeAllGrammarPopovers();
        } else {
          const msg = firstIns.getAttribute('data-msg') || 'Grammar correction';
          const cat = firstIns.getAttribute('data-cat') || 'Grammar';
          showGrammarExplanation(firstIns, msg, cat);
        }
      } else if (row.__grammarCorrections && row.__grammarCorrections.length > 0) {
        const targetTag = row.querySelector('.bubble');
        if (activeGrammarPopover && activeGrammarPopover.__target === targetTag) {
          closeAllGrammarPopovers();
        } else {
          const first = row.__grammarCorrections[0];
          showGrammarExplanation(targetTag, first.message || 'Grammar correction', first.category || 'GRAMMAR');
        }
      } else {
        const textSpan = row.querySelector('.bubble-text-content');
        const msgId = row.dataset.msgId;
        const msgText = textSpan ? textSpan.textContent : '';

        if (msgId && msgText && msgText.trim().length >= 3) {
          const isOutgoing = row.classList.contains('outgoing');
          const timeEl = row.querySelector('.message-time');
          const timeStr = timeEl ? timeEl.textContent : null;
          checkAndShowMessageGrammar(msgId, msgText, isOutgoing ? 'outgoing' : 'incoming', timeStr, true);
        }
      }
    });
  }

  // ── Image Attachment & Upload Event Handlers ──
  if (imageFileInput) {
    imageFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        handleSendImage(file);
      }
      imageFileInput.value = '';
    });
  }

  if (imageBtn && imageFileInput) {
    let lastImageBtnTouchTime = 0;
    const triggerImagePicker = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      imageFileInput.click();
    };

    imageBtn.addEventListener('touchstart', (e) => {
      lastImageBtnTouchTime = Date.now();
      triggerImagePicker(e);
    }, { passive: false });

    imageBtn.addEventListener('click', (e) => {
      if (Date.now() - lastImageBtnTouchTime < 400) return;
      triggerImagePicker(e);
    });
  }

  // Drag and drop photo onto chat app
  if (chatApp) {
    chatApp.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    chatApp.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          handleSendImage(file);
        }
      }
    });
  }

  // ── Clipboard Image Pasting (Ctrl+V / Paste Everywhere) ──
  function handleClipboardPaste(e) {
    const clipboard = e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData) || window.clipboardData;
    if (!clipboard) return;

    // 1. Check direct clipboard files
    if (clipboard.files && clipboard.files.length > 0) {
      for (let i = 0; i < clipboard.files.length; i++) {
        const file = clipboard.files[i];
        if (file && file.type && file.type.startsWith('image/')) {
          e.preventDefault();
          e.stopPropagation();
          handleSendImage(file);
          keepInputFocused();
          return;
        }
      }
    }

    // 2. Check items collection (supports Snipping Tool, screenshots, copied images)
    if (clipboard.items && clipboard.items.length > 0) {
      for (let i = 0; i < clipboard.items.length; i++) {
        const item = clipboard.items[i];
        if (item && (item.type.startsWith('image/') || item.kind === 'file')) {
          const file = item.getAsFile ? item.getAsFile() : null;
          if (file && file.type && file.type.startsWith('image/')) {
            e.preventDefault();
            e.stopPropagation();
            handleSendImage(file);
            keepInputFocused();
            return;
          }
        }
      }
    }
  }

  window.addEventListener('paste', handleClipboardPaste, true);
  if (chatInput) {
    chatInput.addEventListener('paste', handleClipboardPaste, true);
  }

  // Lightbox close interactions
  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeImageLightbox);
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeImageLightbox);
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageLightbox && imageLightbox.style.display !== 'none') {
      closeImageLightbox();
    }
  });

  // Set initial action button mode (Mic by default)
  updateActionBtnState();
}




// ─────────────────────────────────────────────────
//  Keyboard UI Handling
// ─────────────────────────────────────────────────
function setupKeyboardUIHandling() {
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      if (currentView === 'conversation') {
        scrollToBottom();
      }
    });
  }
  chatInput.addEventListener('focus', () => {
    if (currentView !== 'conversation') {
      chatInput.blur();
      return;
    }
    chatInput.setAttribute('autocomplete', 'off');
    chatInput.setAttribute('data-form-type', 'other');
    chatInput.setAttribute('data-lpignore', 'true');
    inputPill.classList.add('focused');
    setTimeout(scrollToBottom, 150);
  });
  chatInput.addEventListener('blur', () => {
    inputPill.classList.remove('focused');
  });
}

// ─────────────────────────────────────────────────
//  Toast Notification
// ─────────────────────────────────────────────────
let toastTimer = null;
function showToast(message, type = 'info') {
  let toast = document.getElementById('liveToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'liveToast';
    document.getElementById('chatApp').appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `live-toast live-toast--${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ─────────────────────────────────────────────────
//  Keypress Sound System
// ─────────────────────────────────────────────────
function getAudioContext() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  return audioCtx;
}

const unlockAudioOnGesture = () => {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  if (!audioBuffersLoaded) {
    preloadKeypressSounds();
  }
};
document.addEventListener('pointerdown', unlockAudioOnGesture, { once: true });
document.addEventListener('keydown', unlockAudioOnGesture, { once: true });

async function preloadKeypressSounds() {
  if (audioBuffersLoaded) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const buffers = await Promise.all(SOUND_FILES.map(async (f) => {
      const res = await fetch(`${soundBasePath}${f}`);
      const ab  = await res.arrayBuffer();
      return ctx.decodeAudioData(ab);
    }));
    KEYPRESS_AUDIO_BUFFERS.push(...buffers);
    audioBuffersLoaded = true;
  } catch (e) { /* silent */ }
}

const fallbackAudio = SOUND_FILES.map((f) => {
  const a = new Audio(`${soundBasePath}${f}`);
  a.volume = 0.25;
  return a;
});

let lastLocalSoundPlayTime = 0;
let lastOpponentSoundPlayTime = 0;
let localAudioGainNode = null;
let opponentAudioGainNode = null;

function getLocalGainNode(ctx) {
  if (!localAudioGainNode && ctx) {
    localAudioGainNode = ctx.createGain();
    localAudioGainNode.gain.value = 0.25;
    localAudioGainNode.connect(ctx.destination);
  }
  return localAudioGainNode;
}

function getOpponentGainNode(ctx) {
  if (!opponentAudioGainNode && ctx) {
    opponentAudioGainNode = ctx.createGain();
    opponentAudioGainNode.gain.value = 0.11;
    opponentAudioGainNode.connect(ctx.destination);
  }
  return opponentAudioGainNode;
}

function playKeypressSound() {
  if (!soundEnabled) return;
  const now = performance.now();
  if (now - lastLocalSoundPlayTime < 32) return;
  lastLocalSoundPlayTime = now;

  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  let idx = Math.floor(Math.random() * SOUND_FILES.length);
  if (idx === lastSoundIndex) idx = (idx + 1) % SOUND_FILES.length;
  lastSoundIndex = idx;

  if (ctx && audioBuffersLoaded && KEYPRESS_AUDIO_BUFFERS[idx]) {
    try {
      const src = ctx.createBufferSource();
      const gain = getLocalGainNode(ctx);
      src.buffer = KEYPRESS_AUDIO_BUFFERS[idx];
      src.connect(gain);
      src.start(0);
      return;
    } catch (_) { /* ignore */ }
  }

  if (fallbackAudio && fallbackAudio[idx]) {
    try {
      const clone = fallbackAudio[idx].cloneNode();
      clone.volume = 0.25;
      clone.play().catch(() => {});
    } catch (_) {}
  }
}

const playOpponentKeypressSound = playKeypressSound;

function playOpponentLiveSound() {
  if (!soundEnabled) return;
  const now = performance.now();
  if (now - lastOpponentSoundPlayTime < 32) return;
  lastOpponentSoundPlayTime = now;

  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  let idx = Math.floor(Math.random() * SOUND_FILES.length);
  if (idx === lastSoundIndex) idx = (idx + 1) % SOUND_FILES.length;
  lastSoundIndex = idx;

  if (ctx && audioBuffersLoaded && KEYPRESS_AUDIO_BUFFERS[idx]) {
    try {
      const src = ctx.createBufferSource();
      const gain = getOpponentGainNode(ctx);
      src.buffer = KEYPRESS_AUDIO_BUFFERS[idx];
      src.connect(gain);
      src.start(0);
      return;
    } catch (_) { /* ignore */ }
  }

  if (fallbackAudio && fallbackAudio[idx]) {
    try {
      const clone = fallbackAudio[idx].cloneNode();
      clone.volume = 0.11;
      clone.play().catch(() => {});
    } catch (_) {}
  }
}

// ─────────────────────────────────────────────────
//  Utility
// ─────────────────────────────────────────────────
function formatCurrentTime() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ap}`;
}

function formatDuration(sec) {
  return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;
}

// ─────────────────────────────────────────────────
//  Floating Balloon Emoji Reactions
// ─────────────────────────────────────────────────
let lastEmojiTapTime = 0;
let lastIncomingEmojiTime = 0;
const EMOJI_COOLDOWN_MS = 3000;

function applyEmojiCooldownUI(durationMs) {
  const emojiButtons = document.querySelectorAll('.emoji-btn');
  emojiButtons.forEach(btn => btn.classList.add('is-cooldown'));
  if (loveBlastBtn) loveBlastBtn.classList.add('is-cooldown');

  setTimeout(() => {
    emojiButtons.forEach(btn => btn.classList.remove('is-cooldown'));
    if (loveBlastBtn) loveBlastBtn.classList.remove('is-cooldown');
  }, durationMs);
}

function getBalloonsContainer() {
  let container = document.getElementById('floatingBalloonsContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'floatingBalloonsContainer';
    container.className = 'floating-balloons-container';
    (chatApp || document.body).appendChild(container);
  }
  return container;
}

const EMOJI_KEYWORD_TRIGGERS = [
  { emoji: '💋', keywords: ['chumu', 'chumma', 'kiss', 'muah', 'seduce', 'attraction'] },
  { emoji: '🫦', keywords: ['thot', 'kamor', 'biting', 'nibble', 'tempting', 'desire'] },
  { emoji: '😘', keywords: ['chumu', 'chumma', 'kiss', 'muah', 'romance', 'seduce'] },
  { emoji: '🥰', keywords: ['bhalobasha', 'prem', 'valobashi', 'valobasi', 'bhalobasi', 'adore', 'intimacy', 'affection', 'love'] },
  { emoji: '😍', keywords: ['sundor', 'shundor', 'mugdho', 'gorgeous', 'beautiful', 'attraction', 'desire'] },
  { emoji: '❤️‍🔥', keywords: ['agun', 'prem', 'passion', 'desire', 'lust', 'intimacy'] },
  { emoji: '🥵', keywords: ['gorom', 'hot', 'sexy', 'spicy', 'horny', 'aroused'] },
  { emoji: '😏', keywords: ['dushtu', 'dushtumi', 'flirty', 'naughty', 'tease', 'suggestive'] },
  { emoji: '🤤', keywords: ['lobh', 'khide', 'yummy', 'tasty', 'tempting', 'craving'] },
  { emoji: '😉', keywords: ['ishara', 'wink', 'dushtu', 'hehe', 'flirt', 'tease'] },
  { emoji: '👅', keywords: ['jib', 'vengchi', 'tease', 'lick', 'playful', 'naughty'] },
  { emoji: '🔥', keywords: ['agun', 'joss', 'darun', 'fire', 'passion', 'desire'] },
  { emoji: '❤️', keywords: ['bhalobasha', 'valobashi', 'valobasi', 'mon', 'prem', 'affection', 'intimacy'] },
  { emoji: '💖', keywords: ['mishti', 'jhikimiki', 'maya', 'sparkle', 'affection', 'romance'] },
  { emoji: '💕', keywords: ['dujon', 'juti', 'prem', 'couple', 'romance', 'intimacy'] },
  { emoji: '💘', keywords: ['cupid', 'crush', 'prem', 'monchuri', 'attraction', 'desire'] },
  { emoji: '💓', keywords: ['dhorfor', 'heartbeat', 'kapche', 'uttejona', 'excitement', 'passion'] },
  { emoji: '🫂', keywords: ['joriye', 'hug', 'ador', 'cuddle', 'intimacy', 'closeness'] },
  { emoji: '🌹', keywords: ['golap', 'ful', 'romance', 'seduction', 'attraction', 'desire', 'rose'] },
  { emoji: '🍷', keywords: ['wine', 'cheers', 'drink', 'party', 'romance', 'date'] },
  { emoji: '🍓', keywords: ['strawberry', 'strobari', 'fol', 'mishti', 'juicy', 'tempting'] },
  { emoji: '🍫', keywords: ['chocolate', 'choklet', 'choco', 'mishti', 'sweet', 'craving'] },
  { emoji: '🥺', keywords: ['please', 'plz', 'daya', 'maf', 'maaf', 'affection', 'needy'] },
  { emoji: '✨', keywords: ['jhikimiki', 'jholmole', 'chokchoke', 'sparkle', 'magic', 'sensual'] }
];

function findTriggerEmojisForText(text) {
  if (!text) return [];
  const normalized = text.toLowerCase();
  const matched = [];

  for (const item of EMOJI_KEYWORD_TRIGGERS) {
    for (const kw of item.keywords) {
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${kw}([^a-zA-Z0-9]|$)`, 'i');
      if (regex.test(normalized)) {
        if (!matched.includes(item.emoji)) {
          matched.push(item.emoji);
        }
        break;
      }
    }
  }
  return matched;
}

let lastAutoTriggerTime = 0;

function triggerKeywordEmojiAnimations(text, broadcast = true) {
  return; // Disabled: Clean text mode only
  const emojis = findTriggerEmojisForText(text);
  if (emojis.length === 0) return;

  const now = Date.now();
  if (now - lastAutoTriggerTime < 800) return;
  lastAutoTriggerTime = now;

  emojis.slice(0, 2).forEach((emojiChar, idx) => {
    setTimeout(() => {
      // Animate corresponding emoji button in grid
      const btn = document.querySelector(`.emoji-btn[data-emoji="${emojiChar}"]`) ||
                  Array.from(document.querySelectorAll('.emoji-btn')).find(b => b.textContent.trim() === emojiChar);
      if (btn) {
        btn.classList.add('keyword-pulse');
        setTimeout(() => btn.classList.remove('keyword-pulse'), 800);
      }

      if (broadcast) {
        sendFlyingEmojiBalloon(emojiChar);
      } else {
        createFlyingBalloon(emojiChar);
      }
    }, idx * 350);
  });
}

const COMPANION_EMOJIS = {
  '💋': ['🫦', '❤️‍🔥', '😘', '✨', '💕', '🥰'],
  '🫦': ['💋', '🥵', '❤️‍🔥', '😏', '✨', '😍'],
  '❤️‍🔥': ['🔥', '💋', '❤️', '🥵', '✨', '💖'],
  '🥵': ['🫦', '🔥', '❤️‍🔥', '😏', '🤤', '💋'],
  '😘': ['💋', '🥰', '😍', '💕', '✨', '💘'],
  '🥰': ['😍', '😘', '💖', '💕', '✨', '🌹'],
  '😍': ['🥰', '❤️‍🔥', '💖', '💘', '💋', '✨'],
  '😏': ['🫦', '🥵', '😉', '👅', '✨', '🔥'],
  '🤤': ['🥵', '🫦', '💋', '😏', '❤️‍🔥', '✨'],
  '😉': ['😏', '😘', '💋', '✨', '👅', '💖'],
  '👅': ['😏', '🫦', '🥵', '🔥', '💋', '✨'],
  '🔥': ['❤️‍🔥', '🥵', '💋', '🫦', '✨', '💖'],
  '❤️': ['💖', '💕', '💘', '💓', '❤️‍🔥', '🌹'],
  '💖': ['💕', '💓', '✨', '❤️', '💘', '🥰'],
  '💕': ['💖', '❤️', '💘', '💓', '✨', '🥰'],
  '💘': ['💖', '💕', '❤️', '💓', '✨', '😍'],
  '💓': ['💖', '💕', '❤️', '💘', '✨', '🥰'],
  '🫂': ['🥰', '❤️', '💖', '💕', '✨', '🥺'],
  '🌹': ['❤️', '🍷', '🍫', '✨', '💖', '🥰'],
  '🍷': ['🌹', '🍫', '🍓', '✨', '❤️', '💋'],
  '🍓': ['🍫', '🍷', '💋', '🫦', '✨', '💖'],
  '🍫': ['🍓', '🍷', '🌹', '✨', '💖', '🥰'],
  '🥺': ['🥰', '🫂', '💖', '💕', '✨', '💓'],
  '✨': ['💖', '💕', '❤️‍🔥', '🌹', '🥰', '💋']
};

const TRAJECTORY_STYLES = ['fly-wave-a', 'fly-wave-b', 'fly-spiral', 'fly-burst'];

function createFlyingBalloon(emojiChar) {
  return; // Disabled: Clean text mode only
  if (!emojiChar) return;
  const container = getBalloonsContainer();

  // Guard against mass spam: cap max active balloons in DOM to prevent lag/crashing
  if (container.children.length >= 24) {
    return;
  }

  const companions = COMPANION_EMOJIS[emojiChar] || ['✨', '💖', '❤️‍🔥', '💕', '💋'];

  // Balanced flock: 6-8 emojis with staggered fountain timing for high framerate
  const count = 6 + Math.floor(Math.random() * 3); // 6 to 8 emojis
  const baseLeft = 18 + Math.random() * 64; // central launch area (18% - 82%)

  for (let i = 0; i < count; i++) {
    const staggerDelay = i * (40 + Math.floor(Math.random() * 20)); // 40-60ms stagger

    setTimeout(() => {
      // Re-check so late staggered items don't overflow DOM
      if (container.children.length >= 28) return;

      const balloon = document.createElement('div');

      // Random trajectory variant
      const trajectoryStyle = TRAJECTORY_STYLES[Math.floor(Math.random() * TRAJECTORY_STYLES.length)];
      balloon.className = `flying-balloon ${trajectoryStyle}`;

      const isLead = (i === 0 || i === 1);
      const isMini = (i >= count - 2);

      // Emoji selection: lead is always the chosen emoji, others mix companions & sparkles
      let chosenChar = emojiChar;
      if (!isLead && Math.random() > 0.42) {
        chosenChar = companions[Math.floor(Math.random() * companions.length)];
      }

      // Sizing tier
      let size;
      if (isLead) {
        size = 44 + Math.floor(Math.random() * 8); // 44-52px
      } else if (isMini) {
        size = 22 + Math.floor(Math.random() * 6); // 22-28px
      } else {
        size = 32 + Math.floor(Math.random() * 8); // 32-40px
      }

      // Wide, organic natural spread across the view
      const spreadJitter = (Math.random() * 60 - 30) + (i % 2 === 0 ? 12 : -12);
      const leftPos = Math.max(6, Math.min(94, baseLeft + spreadJitter));

      const duration = (2.8 + Math.random() * 0.8).toFixed(2);
      const sway1 = (16 + Math.random() * 22) * (Math.random() > 0.5 ? 1 : -1);
      const sway2 = -sway1 * (0.8 + Math.random() * 0.4);
      const sway3 = (14 + Math.random() * 18) * (Math.random() > 0.5 ? 1 : -1);
      const sway4 = -sway3 * (0.7 + Math.random() * 0.5);

      const rot1 = (6 + Math.random() * 12) * (sway1 > 0 ? 1 : -1);
      const rot2 = -rot1 * 0.85;
      const rot3 = (5 + Math.random() * 8) * (sway3 > 0 ? 1 : -1);
      const rot4 = -rot3 * 0.7;

      balloon.style.left = `${leftPos}%`;
      balloon.style.setProperty('--fly-duration', `${duration}s`);
      balloon.style.setProperty('--balloon-size', `${size}px`);
      balloon.style.setProperty('--sway-1', `${sway1}px`);
      balloon.style.setProperty('--sway-2', `${sway2}px`);
      balloon.style.setProperty('--sway-3', `${sway3}px`);
      balloon.style.setProperty('--sway-4', `${sway4}px`);
      balloon.style.setProperty('--rot-1', `${rot1}deg`);
      balloon.style.setProperty('--rot-2', `${rot2}deg`);
      balloon.style.setProperty('--rot-3', `${rot3}deg`);
      balloon.style.setProperty('--rot-4', `${rot4}deg`);

      const hasSparkleBadge = (isLead || Math.random() < 0.25);
      const sparkleBadgeHtml = hasSparkleBadge ? `<span class="balloon-sparkle" aria-hidden="true">${renderEmojiHtml('✨')}</span>` : '';

      balloon.innerHTML = `
        <span class="balloon-emoji" aria-hidden="true">${renderEmojiHtml(chosenChar)}</span>
        ${sparkleBadgeHtml}
        <div class="balloon-string" aria-hidden="true"></div>
      `;

      balloon.addEventListener('animationend', () => {
        balloon.remove();
      });

      setTimeout(() => {
        if (balloon.parentNode) balloon.remove();
      }, (parseFloat(duration) + 0.6) * 1000);

      container.appendChild(balloon);
    }, staggerDelay);
  }
}

function sendFlyingEmojiBalloon(emojiChar) {
  if (!emojiChar) return false;
  const now = Date.now();
  if (now - lastEmojiTapTime < EMOJI_COOLDOWN_MS) {
    const remainingSeconds = Math.ceil((EMOJI_COOLDOWN_MS - (now - lastEmojiTapTime)) / 1000);
    showToast(`Wait ${remainingSeconds}s before sending another emoji reaction ⏳`, 'info');
    return false;
  }
  lastEmojiTapTime = now;
  applyEmojiCooldownUI(EMOJI_COOLDOWN_MS);

  // 1. Instantly trigger floating balloons on own chat inbox
  createFlyingBalloon(emojiChar);

  // 2. Broadcast to opponent via live WebSocket (zero server delay)
  wsSend({
    type: 'flying_emoji',
    emoji: emojiChar
  });

  // 3. Keep virtual keyboard open and input focused
  keepInputFocused();
  return true;
}

// ─────────────────────────────────────────────────
//  App Visibility, Focus & Connection Keep-Alive
// ─────────────────────────────────────────────────
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    if (activeUser && pinOverlay && pinOverlay.classList.contains('unlocked')) {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.log('[App] Tab resumed — reconnecting WebSocket...');
        connectWebSocket(activeUser);
      } else {
        wsSend({ type: 'ping' });
      }
      if (currentPartner && currentPartner.key && currentView === 'conversation') {
        loadChatHistory(currentPartner.key);
      }
      fetchRegisteredUsers();
      refreshOpponentPresence();
    }
  }
});

window.addEventListener('focus', () => {
  if (activeUser && pinOverlay && pinOverlay.classList.contains('unlocked')) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      connectWebSocket(activeUser);
    }
    if (currentPartner && currentPartner.key && currentView === 'conversation') {
      loadChatHistory(currentPartner.key);
    }
    fetchRegisteredUsers();
    refreshOpponentPresence();
  }
});

window.addEventListener('online', () => {
  if (activeUser) {
    connectWebSocket(activeUser);
    if (currentPartner && currentPartner.key && currentView === 'conversation') {
      loadChatHistory(currentPartner.key);
    }
    fetchRegisteredUsers();
    refreshOpponentPresence();
  }
});

// Periodic keep-alive heartbeat ping every 20s
setInterval(() => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    wsSend({ type: 'ping' });
  }
}, 20000);

