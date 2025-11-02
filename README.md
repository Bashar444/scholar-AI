# Scholar AI - AI-Powered Research Paper Analysis Tool

A next-generation microservice-powered web app for analyzing research papers with AI-driven color-coded highlighting, Q&A capabilities, and literature review extraction.

## 🎯 Project Overview

Scholar AI allows users to:
- **Upload** research papers (PDF/DOCX) via drag-and-drop
- **Analyze** papers with AI to identify key components:
  - Importance (Yellow)
  - Research Gap (Pink)
  - Objective (Green)
  - Method (Blue)
  - Key Findings (Purple)
  - Implications (Orange)
- **Chat** with papers (NotebookLM-style Q&A)
- **Extract** literature reviews and citations
- **Export** annotated papers and insights (PDF, Markdown, Text)

## 🏗️ Architecture

```
scholar_AI/
├── frontend/                 # Next.js 15 + TypeScript
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Next.js pages
│   │   ├── styles/           # TailwindCSS styles
│   │   └── utils/            # Utility functions
│   ├── public/               # Static assets
│   └── package.json
├── backend/                  # Python FastAPI
│   ├── app/
│   │   ├── api/
│   │   │   ├── upload.py
│   │   │   ├── analyze.py
│   │   │   └── chat.py
│   │   ├── services/         # Business logic
│   │   └── models/           # Data models
│   ├── requirements.txt
│   └── main.py
├── docs/                     # Documentation
└── .gitignore
```

## 🚀 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

## 🔧 Tech Stack

**Frontend:**
- Next.js 15
- TypeScript
- TailwindCSS + shadcn/ui
- Framer Motion
- React

**Backend:**
- Python 3.11+
- FastAPI
- Claude Haiku 4.5 API
- Supabase (Storage & DB)
- PyMuPDF (PDF extraction)

**Deployment:**
- Vercel (Frontend)
- Supabase/Cloud Run (Backend)

## 📋 Features Roadmap

- [ ] File upload system
- [ ] AI paper analysis
- [ ] Color-coded visualization
- [ ] Q&A chatbot
- [ ] Literature review extraction
- [ ] Export functionality
- [ ] Dark/Light mode
- [ ] Anonymous sessions
- [ ] Deployment to production

## 📝 License

MIT

## 👤 Author

Scholar AI Team
