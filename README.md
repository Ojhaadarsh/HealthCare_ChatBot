# MediMind — AI Healthcare Chatbot for Smart Diagnosis

> An empathetic AI healthcare assistant that helps users understand their symptoms, with multi-turn conversational reasoning, severity-based triage, and safety-first design.

## What it does

MediMind isn't a static symptom-checker. It's a conversational healthcare assistant that:

- **Asks targeted follow-up questions** to understand your symptoms (duration, severity, location, related symptoms)
- **Returns structured diagnoses** with possible conditions ranked by confidence
- **Triages every response** into one of four severity levels: Self-care, Consult GP, Urgent, or Emergency
- **Detects emergencies** instantly via keyword matching + LLM reasoning (chest pain, stroke signs, suicidal ideation) and escalates to emergency helplines
- **Stores consultation history** so users can revisit past conversations
- **Supports voice input** (Web Speech API) for accessibility
- **Speaks English and Hindi** for India-relevant context

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, React Router, Lucide Icons |
| Backend | Node.js, Express, MongoDB (Mongoose), JWT authentication |
| AI / NLP | OpenAI `gpt-4o-mini` via LangChain.js with conversation memory |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas |

## Architecture

```
React frontend  ──HTTPS──▶  Express API  ──▶  LangChain  ──▶  OpenAI
                              │
                              ├──▶  MongoDB Atlas (users, conversations)
                              └──▶  Safety service (emergency keyword detection)
```

## Project structure

```
medimind/
├── backend/
│   ├── src/
│   │   ├── config/         MongoDB connection
│   │   ├── controllers/    auth, chat
│   │   ├── middleware/     JWT auth, error handler
│   │   ├── models/         User, Conversation
│   │   ├── routes/         /api/auth, /api/chat
│   │   ├── services/       diagnosisService (LangChain), safetyService
│   │   ├── prompts/        system prompt
│   │   ├── app.js          Express app
│   │   └── server.js       entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     ChatWindow, MessageBubble, TriageBadge, etc.
    │   ├── pages/          Landing, Login, Signup, Chat
    │   ├── services/       API client
    │   ├── context/        AuthContext
    │   ├── hooks/          useVoiceInput
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Getting started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free tier works)
- OpenAI API key

### Backend setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and OpenAI key
npm run dev
```

The backend runs on `http://localhost:5000`.

### Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if your backend URL differs from default
npm run dev
```

The frontend runs on `http://localhost:5173`.

### Environment variables

**Backend `.env`:**
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=sk-...
CLIENT_URL=http://localhost:5173
```

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

## API reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user (protected) |
| PUT | `/api/auth/profile` | Update profile (protected) |

### Chat

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/chat/message` | Send a symptom message, get AI response |
| GET | `/api/chat/conversations` | List user's past consultations |
| GET | `/api/chat/conversations/:id` | Get full conversation |
| DELETE | `/api/chat/conversations/:id` | Delete a conversation |

### Sample request

```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "I have had a fever for 2 days and my throat hurts"}'
```

### Sample response

```json
{
  "conversationId": "65f...",
  "diagnosis": {
    "reply": "I'm sorry you're feeling unwell. To help me understand better, can you tell me how high your fever has been?",
    "needsFollowUp": true,
    "followUpQuestion": "How high has your fever been?",
    "possibleConditions": [],
    "severity": "SELF_CARE",
    "recommendedActions": ["Rest and stay hydrated"],
    "homeRemedies": ["Warm salt water gargle for sore throat"],
    "redFlags": [],
    "disclaimer": "MediMind is not a substitute for professional medical advice."
  }
}
```

## Safety design

This is a healthcare app — safety is non-negotiable. MediMind implements:

1. **Hard-coded emergency keyword detection** — bypasses LLM entirely for chest pain, stroke signs, suicidal ideation, and routes directly to emergency helplines
2. **System prompt guardrails** — the LLM is explicitly forbidden from prescribing medications or specific dosages
3. **Forced JSON schema** — using OpenAI's `response_format: json_object` with strict parsing
4. **Rate limiting** — 30 requests/minute to prevent abuse
5. **Disclaimer in every response** — no consultation goes out without it
6. **Mental health helplines** — iCall, Vandrevala Foundation contact info auto-included

## Deployment

### Backend (Render)

1. Push to GitHub
2. Create new Web Service on Render
3. Connect repo, root directory: `backend`
4. Build command: `npm install`, start command: `npm start`
5. Add all environment variables from `.env`

### Frontend (Vercel)

1. Push to GitHub
2. Import on Vercel
3. Root directory: `frontend`
4. Add `VITE_API_URL` pointing to your Render backend
5. Deploy

### MongoDB (Atlas)

Free M0 cluster works perfectly. Whitelist `0.0.0.0/0` for Render to connect (or use Render's specific IPs).

## Future enhancements

- PDF export of consultation summaries
- Doctor-facing dashboard for sharing reports
- Image input for visible symptoms (rashes, wounds)
- Integration with telehealth providers
- ICD-10 code mapping for clinical handoff

## Demo credentials (for showcase)

After running locally, register with any email — the system creates accounts on demand.

## License

MIT — built as an academic project. Not for commercial medical use.

---

Disclaimer: MediMind provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.
