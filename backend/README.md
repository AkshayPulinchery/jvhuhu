# CuteMail Backend

Django REST API for the CuteMail post-quantum secure email platform.

**Zero-knowledge design:** the backend stores only encrypted blobs.
It never decrypts email content and never stores private keys.

---

## Quick Start

### 1. Create and activate a virtual environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Open .env and set SECRET_KEY to any long random string.
# Optionally add OPENAI_API_KEY for real AI responses.
```

### 4. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create a superuser (optional, for admin panel)

```bash
python manage.py createsuperuser
```

### 6. Start the development server

```bash
python manage.py runserver
```

Server runs at: **http://127.0.0.1:8000/**  
Admin panel: **http://127.0.0.1:8000/admin/**

---

## API Reference

### Authentication

All protected endpoints require:
```
Authorization: Bearer <access_token>
```

---

### POST `/api/auth/register/`

Create a new account.

**Request:**
```json
{
  "username": "akshay",
  "email": "akshay@example.com",
  "password": "password123",
  "public_key": "YOUR_PUBLIC_KEY_FROM_FRONTEND"
}
```

**Response `201`:**
```json
{
  "message": "Account created successfully.",
  "user": {
    "id": 1,
    "username": "akshay",
    "email": "akshay@example.com",
    "public_key": "...",
    "created_at": "2025-01-01T00:00:00Z"
  },
  "tokens": {
    "access": "<jwt_access_token>",
    "refresh": "<jwt_refresh_token>"
  }
}
```

---

### POST `/api/auth/login/`

**Request:**
```json
{
  "email": "akshay@example.com",
  "password": "password123"
}
```

**Response `200`:**
```json
{
  "access": "<jwt_access_token>",
  "refresh": "<jwt_refresh_token>"
}
```

---

### POST `/api/auth/token/refresh/`

**Request:**
```json
{ "refresh": "<jwt_refresh_token>" }
```

**Response `200`:**
```json
{ "access": "<new_access_token>" }
```

---

### GET `/api/auth/me/`  *(protected)*

**Response `200`:**
```json
{
  "id": 1,
  "username": "akshay",
  "email": "akshay@example.com",
  "public_key": "...",
  "created_at": "2025-01-01T00:00:00Z"
}
```

---

### GET `/api/users/public-key/<email>/`

Fetch a user's public key so you can encrypt an email for them.

**Response `200`:**
```json
{
  "email": "friend@example.com",
  "public_key": "..."
}
```

---

### POST `/api/mails/send/`  *(protected)*

**Request:**
```json
{
  "receiver_email": "friend@example.com",
  "subject_encrypted": "<encrypted_subject_blob>",
  "body_encrypted": "<encrypted_body_blob>",
  "encrypted_key": "<symmetric_key_encrypted_with_receiver_public_key>",
  "expires_at": null
}
```

**Response `201`:** Returns the created email object.

---

### GET `/api/mails/inbox/`  *(protected)*

Returns all emails where the logged-in user is the receiver.

---

### GET `/api/mails/sent/`  *(protected)*

Returns all emails where the logged-in user is the sender.

---

### GET `/api/mails/<id>/`  *(protected)*

Fetch a single email. Only sender or receiver can access.

---

### PATCH `/api/mails/<id>/read/`  *(protected)*

Mark an email as read. Only the receiver can call this.

**Response `200`:**
```json
{ "message": "Marked as read.", "is_read": true }
```

---

### DELETE `/api/mails/<id>/`  *(protected)*

Delete an email. Sender or receiver can delete.

---

### POST `/api/ai/generate-email/`  *(protected)*

**Request:**
```json
{ "prompt": "ask teacher for leave tomorrow", "tone": "formal" }
```

**Response `200`:**
```json
{
  "subject": "Request for Leave Tomorrow",
  "body": "Dear Teacher, ..."
}
```

---

### POST `/api/ai/rewrite/`  *(protected)*

**Request:**
```json
{ "text": "need leave tomorrow", "tone": "professional" }
```

**Response `200`:**
```json
{ "rewritten": "Dear [Recipient], ..." }
```

---

### POST `/api/ai/summarize/`  *(protected)*

**Request:**
```json
{ "text": "<decrypted email text from frontend>" }
```

**Response `200`:**
```json
{ "summary": "This email discusses ..." }
```

---

### POST `/api/ai/spam-check/`  *(protected)*

**Request:**
```json
{ "text": "You won! Click here to claim your prize." }
```

**Response `200`:**
```json
{
  "is_spam": true,
  "confidence": 85,
  "reason": "Contains suspicious phrases: won, prize, click here."
}
```

---

## Project Structure

```
backend/
├── manage.py
├── requirements.txt
├── .env.example
├── cutemail_backend/       # Django project config
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── accounts/               # User auth + public key
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── mails/                  # Encrypted email storage
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
└── ai_tools/               # AI feature endpoints
    ├── services.py         # AI logic (swap mock → real here)
    ├── views.py
    └── urls.py
```

## Enabling Real AI

1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Add it to `.env`: `OPENAI_API_KEY=sk-...`
3. Restart the server — no code changes needed.
