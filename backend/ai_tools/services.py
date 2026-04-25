"""
AI Services for CuteMail
========================
All AI functions work in two modes:
  1. REAL MODE — if OPENAI_API_KEY is set in .env, calls GPT-3.5-turbo.
  2. MOCK MODE — if no API key, returns hard-coded but realistic responses.

To switch to real AI: add OPENAI_API_KEY=sk-... to your .env file.
No other code changes needed.
"""
from django.conf import settings

# Detect whether OpenAI is available and configured
try:
    from openai import OpenAI as _OpenAI
    _OPENAI_READY = bool(settings.OPENAI_API_KEY)
except ImportError:
    _OPENAI_READY = False


def _client():
    return _OpenAI(api_key=settings.OPENAI_API_KEY)


# ---------------------------------------------------------------------------
# generate_email
# ---------------------------------------------------------------------------

def generate_email(prompt: str, tone: str) -> dict:
    """Return {"subject": ..., "body": ...} for the given prompt and tone."""
    if _OPENAI_READY:
        response = _client().chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": (
                        f"You are an expert email writer. "
                        f"Write a complete email in a {tone} tone. "
                        f"Format your response as:\nSubject: <subject>\n\n<body>"
                    ),
                },
                {"role": "user", "content": f"Write an email about: {prompt}"},
            ],
        )
        text = response.choices[0].message.content.strip()
        # Parse "Subject: ..." from the first line
        lines = text.split('\n', 1)
        subject = lines[0].replace('Subject:', '').strip()
        body = lines[1].strip() if len(lines) > 1 else text
        return {"subject": subject, "body": body}

    # --- mock ---
    return {
        "subject": f"Regarding: {prompt[:60]}",
        "body": (
            f"Dear [Recipient],\n\n"
            f"I hope this message finds you well. I am writing to you regarding {prompt}.\n\n"
            f"[This is a mock-generated email with a {tone} tone. "
            f"Add your OpenAI key to .env to enable real AI generation.]\n\n"
            f"Best regards,\n[Your Name]"
        ),
    }


# ---------------------------------------------------------------------------
# rewrite_email
# ---------------------------------------------------------------------------

def rewrite_email(text: str, tone: str) -> dict:
    """Return {"rewritten": ...} — same meaning, different tone."""
    if _OPENAI_READY:
        response = _client().chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": f"Rewrite the following email in a {tone} tone. Keep the meaning exactly the same.",
                },
                {"role": "user", "content": text},
            ],
        )
        return {"rewritten": response.choices[0].message.content.strip()}

    # --- mock ---
    return {
        "rewritten": (
            f"[Mock Rewrite — {tone} tone]\n\n"
            f"Dear [Recipient],\n\n"
            f"I hope this message finds you well.\n\n"
            f"{text}\n\n"
            f"Kind regards,\n[Your Name]"
        )
    }


# ---------------------------------------------------------------------------
# summarize_email
# ---------------------------------------------------------------------------

def summarize_email(text: str) -> dict:
    """Return {"summary": ...} — 2-3 sentence summary."""
    if _OPENAI_READY:
        response = _client().chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "Summarize the following email in 2-3 concise sentences.",
                },
                {"role": "user", "content": text},
            ],
        )
        return {"summary": response.choices[0].message.content.strip()}

    # --- mock: first 120 chars as a preview ---
    preview = text[:120].rstrip()
    return {"summary": f"[Mock Summary] This email discusses: \"{preview}...\""}


# ---------------------------------------------------------------------------
# spam_check
# ---------------------------------------------------------------------------

_SPAM_KEYWORDS = [
    'winner', 'won', 'prize', 'lottery', 'free money', 'click here',
    'urgent', 'verify your account', 'limited time', 'act now',
    'congratulations', 'claim your reward', 'suspicious activity',
]


def spam_check(text: str) -> dict:
    """
    Return {"is_spam": bool, "confidence": 0-100, "reason": str}.
    Real mode uses GPT; mock mode uses keyword matching.
    """
    if _OPENAI_READY:
        import json
        response = _client().chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a spam and phishing detector. "
                        "Analyze the text and reply ONLY with valid JSON in this format: "
                        '{"is_spam": true/false, "confidence": <0-100>, "reason": "<explanation>"}'
                    ),
                },
                {"role": "user", "content": text},
            ],
        )
        raw = response.choices[0].message.content.strip()
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            return {"is_spam": False, "confidence": 0, "reason": "Could not parse AI response."}

    # --- mock keyword check ---
    text_lower = text.lower()
    hits = [kw for kw in _SPAM_KEYWORDS if kw in text_lower]

    if hits:
        confidence = min(len(hits) * 20, 95)
        return {
            "is_spam": True,
            "confidence": confidence,
            "reason": f"Contains suspicious phrases: {', '.join(hits)}.",
        }
    return {
        "is_spam": False,
        "confidence": 5,
        "reason": "No obvious spam or phishing indicators detected.",
    }
