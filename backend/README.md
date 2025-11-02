# Scholar AI - Backend API

Python FastAPI backend for Scholar AI research paper analysis.

## Features

- 📤 **File Upload**: Upload PDF and DOCX files
- 🤖 **AI Analysis**: Claude Haiku 4.5 powered paper analysis
- 🎨 **Color-Coded Segments**: Automatically identifies importance, gaps, objectives, methods, findings, implications
- 💬 **Chat Interface**: Ask questions about papers
- 📚 **Literature Review**: Extract citations and references
- 💾 **Supabase Integration**: Cloud storage and database

## Setup

### 1. Create Virtual Environment

```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # macOS/Linux
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**Required environment variables:**
- `CLAUDE_API_KEY`: Your Anthropic API key
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase API key

### 4. Run the Server

```bash
python main.py
```

Server will start at `http://localhost:8000`

## API Endpoints

### Upload Paper
**POST** `/api/upload`
- Upload a PDF or DOCX file
- Returns: `paper_id`, `filename`, message

### Analyze Paper
**POST** `/api/analyze`
- Request body: `{"paper_id": "...", "text": "..."}`
- Returns: Segments with colors, summary, literature review

### Chat with Paper
**POST** `/api/chat`
- Request body: `{"paper_id": "...", "message": "..."}`
- Returns: Assistant response

### Health Check
**GET** `/health`
- Returns: Health status

## Project Structure

```
backend/
├── app/
│   ├── api/              # API routes
│   │   ├── upload.py
│   │   ├── analyze.py
│   │   └── chat.py
│   ├── services/         # Business logic
│   │   ├── claude_analyzer.py
│   │   └── supabase_manager.py
│   ├── models/           # Data schemas
│   │   └── schemas.py
│   └── utils/            # Utilities
│       └── text_extractor.py
├── main.py              # FastAPI app entry
├── config.py            # Configuration
├── requirements.txt     # Dependencies
└── .env                # Environment variables
```

## Color Coding

- **Importance** 🟨 #FCD34D (Yellow)
- **Research Gap** 🟩 #EC4899 (Pink)
- **Objective** 🟩 #10B981 (Green)
- **Method** 🟦 #3B82F6 (Blue)
- **Key Findings** 🟪 #A855F7 (Purple)
- **Implications** 🟧 #F97316 (Orange)

## Development

### Add new dependencies
```bash
pip install package_name
pip freeze > requirements.txt
```

### Format code
```bash
pip install black
black app/ main.py config.py
```

## Deployment

The backend can be deployed to:
- Google Cloud Run
- AWS Lambda
- Heroku
- Render
- Railway

See `docs/DEPLOYMENT.md` for specific instructions.

## License

MIT

## Support

For issues and questions, please open an issue in the GitHub repository.
