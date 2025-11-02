# Scholar AI - Complete Project Setup Guide

This guide covers the complete setup and architecture of Scholar AI, a microservice-powered AI tool for analyzing research papers.

## 🎯 Project Overview

**Scholar AI** is an advanced web application that enables users to:
- Upload research papers (PDF/DOCX)
- Get AI-driven analysis with color-coded components
- Chat interactively with papers
- Extract literature reviews
- Export annotated papers and insights

## 🏗️ Architecture

### Frontend Stack
- **Framework**: Next.js 15 (React)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion
- **State**: Zustand
- **HTTP**: Axios
- **Theme**: next-themes
- **Deployment**: Vercel

### Backend Stack
- **Framework**: FastAPI (Python)
- **Language**: Python 3.11+
- **AI**: Claude Haiku 4.5 (Anthropic API)
- **PDF Processing**: PyMuPDF, pdfminer.six
- **Document Processing**: python-docx
- **Storage**: Supabase
- **Database**: Supabase PostgreSQL
- **Async**: Uvicorn, aiofiles
- **Deployment**: Cloud Run / Supabase Edge Functions

## 📁 Project Structure

```
scholar_AI/
├── frontend/                    # Next.js 15 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── [other components]
│   │   │   ├── UploadZone.tsx
│   │   │   ├── AnalysisViewer.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── Providers.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── stores/
│   │       └── paperStore.ts
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   └── README.md
│
├── backend/                     # FastAPI Python App
│   ├── app/
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── upload.py
│   │   │   ├── analyze.py
│   │   │   └── chat.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── claude_analyzer.py
│   │   │   └── supabase_manager.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── text_extractor.py
│   ├── main.py
│   ├── config.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── .env
│   ├── uploads/              # Temporary upload directory
│   └── README.md
│
├── docs/
│   ├── SETUP.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── ARCHITECTURE.md
│   └── CONTRIBUTING.md
│
├── .gitignore
├── README.md
└── [project root files]
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git
- Supabase account
- Anthropic API key (Claude)

### 1. Clone & Setup Project

```bash
# Clone repository
git clone https://github.com/Bashar444/scholar-AI.git
cd scholar_AI

# Initialize git (if not already done)
git init
git remote add origin https://github.com/Bashar444/scholar-AI.git
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

Frontend runs on: http://localhost:3000

### 3. Backend Setup

```bash
cd ../backend

# Create virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your values

# Run server
python main.py
```

Backend runs on: http://localhost:8000

## 🔌 API Endpoints

### Upload
```
POST /api/upload
- Content-Type: multipart/form-data
- Body: file (PDF or DOCX)
- Response: { paper_id, filename, message }
```

### Analyze
```
POST /api/analyze
- Content-Type: application/json
- Body: { paper_id, text }
- Response: { paper_id, segments, summary, literature_review }
```

### Chat
```
POST /api/chat
- Content-Type: application/json
- Body: { paper_id, message }
- Response: { paper_id, response, conversation_id }
```

## 🎨 UI Components

### Key Frontend Components

#### UploadZone
- Drag-and-drop file upload
- Click to browse
- File validation
- Progress indication

#### AnalysisViewer
- Color-coded text display
- Raw/Annotated view toggle
- Floating tags
- Smooth scrolling

#### ChatInterface
- Message input
- Conversation history
- Real-time responses
- Session management

#### ExportPanel
- PDF export
- Markdown export
- Text export
- Copy to clipboard

## 🤖 AI Analysis Flow

1. **File Upload** → File stored in Supabase
2. **Text Extraction** → PyMuPDF extracts text
3. **Preprocessing** → Clean and normalize text
4. **Claude Analysis** → Segments identified with colors
5. **Response Return** → Color-coded segments sent to frontend
6. **Visualization** → Frontend highlights segments with colors

## 🎨 Color Scheme

```javascript
{
  importance: "#FCD34D",      // Yellow
  gap: "#EC4899",             // Pink
  objective: "#10B981",       // Green
  method: "#3B82F6",          // Blue
  findings: "#A855F7",        // Purple
  implications: "#F97316",    // Orange
}
```

## 🔐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Backend (.env)
```env
CLAUDE_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
API_HOST=0.0.0.0
API_PORT=8000
ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

## 📊 Database Schema

### Papers Table
```sql
CREATE TABLE papers (
  id UUID PRIMARY KEY,
  filename VARCHAR,
  file_size INT,
  storage_path VARCHAR,
  uploaded_at TIMESTAMP,
  status VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
)
```

### Chat History Table
```sql
CREATE TABLE chat_history (
  id UUID PRIMARY KEY,
  paper_id UUID REFERENCES papers(id),
  role VARCHAR,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
)
```

## 🔄 Deployment Pipeline

### Frontend → Vercel
1. Push to GitHub
2. Vercel auto-deploys on commit
3. Environment variables configured in Vercel dashboard
4. Automatic HTTPS, CDN, and edge functions

### Backend → Cloud Run / Render
1. Dockerize FastAPI app
2. Push to container registry
3. Deploy to Cloud Run or Render
4. Configure environment secrets
5. Setup CORS for frontend domain

## 🧪 Testing

### Frontend Tests
```bash
npm test
```

### Backend Tests
```bash
pytest
```

## 📚 Documentation

- `docs/SETUP.md` - Detailed setup instructions
- `docs/API.md` - API reference
- `docs/DEPLOYMENT.md` - Deployment guides
- `docs/ARCHITECTURE.md` - Architecture overview
- `frontend/README.md` - Frontend-specific docs
- `backend/README.md` - Backend-specific docs

## 🚢 Production Deployment

### Vercel (Frontend)
1. Connect GitHub repo to Vercel
2. Set environment variables
3. Deploy (automatic on push)
4. Domain configuration

### Cloud Run (Backend)
1. Create Dockerfile
2. Build and push to Container Registry
3. Deploy to Cloud Run
4. Set environment secrets
5. Configure CORS

See `docs/DEPLOYMENT.md` for detailed steps.

## 🐛 Troubleshooting

### Frontend Issues
- Clear `.next` folder
- Delete `node_modules` and reinstall
- Check API_URL environment variable

### Backend Issues
- Verify Python version (3.11+)
- Check Anthropic API key
- Test Supabase connection
- Review logs: `python main.py`

## 📝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 👥 Support

- GitHub Issues: https://github.com/Bashar444/scholar-AI/issues
- Email: dev@scholarai.dev
- Twitter: @scholarai

## 🎉 Credits

Built with ❤️ using Next.js, FastAPI, Claude, and Supabase

---

**Last Updated**: November 2, 2025
