# API Documentation - Scholar AI

Complete API reference for Scholar AI backend.

## Base URL

Development: `http://localhost:8000`
Production: `https://api.scholarai.dev`

## Health Check

### GET /health
Check API health status.

**Response:**
```json
{
  "status": "healthy"
}
```

## Upload Endpoints

### POST /api/upload
Upload a research paper for analysis.

**Headers:**
```
Content-Type: multipart/form-data
```

**Parameters:**
- `file` (required): PDF or DOCX file

**Response (200):**
```json
{
  "paper_id": "550e8400-e29b-41d4-a716-446655440000",
  "filename": "research-paper.pdf",
  "message": "File uploaded successfully"
}
```

**Error Responses:**
- `400`: File type not allowed or no file provided
- `413`: File too large (max 50MB)
- `500`: Server error

**Example:**
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@paper.pdf"
```

## Analysis Endpoints

### POST /api/analyze
Analyze uploaded paper and identify academic components.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "paper_id": "550e8400-e29b-41d4-a716-446655440000",
  "text": "The paper discusses..."
}
```

**Response (200):**
```json
{
  "paper_id": "550e8400-e29b-41d4-a716-446655440000",
  "segments": [
    {
      "type": "importance",
      "text": "This research addresses a critical gap...",
      "color": "#FCD34D",
      "start_index": 142,
      "end_index": 198
    },
    {
      "type": "objective",
      "text": "Our objective is to demonstrate...",
      "color": "#10B981",
      "start_index": 245,
      "end_index": 302
    }
  ],
  "summary": "A comprehensive study on...",
  "literature_review": [
    "Smith et al. (2020) found that...",
    "Johnson (2019) demonstrated..."
  ]
}
```

**Segment Types:**
- `importance`: Yellow (#FCD34D)
- `gap`: Pink (#EC4899)
- `objective`: Green (#10B981)
- `method`: Blue (#3B82F6)
- `findings`: Purple (#A855F7)
- `implications`: Orange (#F97316)

**Error Responses:**
- `400`: Text too short or invalid input
- `500`: Analysis error

**Example:**
```bash
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "paper_id": "550e8400-e29b-41d4-a716-446655440000",
    "text": "The paper discusses..."
  }'
```

## Chat Endpoints

### POST /api/chat
Chat with an uploaded paper.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "paper_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "What is the main methodology used?"
}
```

**Response (200):**
```json
{
  "paper_id": "550e8400-e29b-41d4-a716-446655440000",
  "response": "The authors employed a mixed-methods approach combining quantitative surveys with qualitative interviews...",
  "conversation_id": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Error Responses:**
- `400`: Message too short or invalid
- `500`: Chat error

**Example:**
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "paper_id": "550e8400-e29b-41d4-a716-446655440000",
    "message": "What are the key findings?"
  }'
```

## Root Endpoint

### GET /
API welcome message and documentation links.

**Response:**
```json
{
  "message": "Welcome to Scholar AI API",
  "docs": "/docs",
  "version": "0.1.0"
}
```

## Error Handling

All errors follow this format:

```json
{
  "detail": "Error description"
}
```

### Common Status Codes
- `200`: Success
- `400`: Bad Request
- `413`: Payload Too Large
- `422`: Unprocessable Entity
- `500`: Internal Server Error
- `503`: Service Unavailable

## Rate Limiting

Currently no rate limiting. In production:
- 100 requests per minute per IP
- 10 MB file size limit
- 30 second timeout for analysis

## Authentication

Currently no authentication required. Session-based access via paper_id.

In production:
- JWT token required
- API key authentication
- Session tokens

## Examples

### Complete Upload & Analyze Flow

```bash
# 1. Upload file
RESPONSE=$(curl -X POST http://localhost:8000/api/upload \
  -F "file=@paper.pdf")
PAPER_ID=$(echo $RESPONSE | jq -r '.paper_id')

# 2. Extract text (would be done on frontend)
TEXT="The paper discusses..."

# 3. Analyze
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d "{
    \"paper_id\": \"$PAPER_ID\",
    \"text\": \"$TEXT\"
  }"
```

### Chat with Paper

```bash
# 1. Chat message
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"paper_id\": \"550e8400-e29b-41d4-a716-446655440000\",
    \"message\": \"Summarize the findings\"
  }"

# 2. Follow-up message
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"paper_id\": \"550e8400-e29b-41d4-a716-446655440000\",
    \"message\": \"What are the limitations?\"
  }"
```

## WebSocket (Future Enhancement)

Future versions will include WebSocket support for real-time streaming:

```
WS ws://localhost:8000/ws/{conversation_id}
```

## Pagination (Future Enhancement)

For list endpoints (planned):

```
GET /api/papers?page=1&limit=10&sort=uploaded_at&order=desc
```

## Response Compression

All responses gzip-compressed for efficiency.

## CORS

Allowed origins (configurable):
- `http://localhost:3000` (development)
- `https://scholarai.vercel.app` (production)

## Versioning

Current version: `v1` (in progress)

Future:
- `v1` - Current stable
- `v2` - Planned features

## Support

For API issues:
- Check examples above
- Review `docs/TROUBLESHOOTING.md`
- Submit GitHub issue

---

**Last Updated**: November 2, 2025
