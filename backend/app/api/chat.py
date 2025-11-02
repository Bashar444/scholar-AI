from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import ChatRequest, ChatResponse
from app.services.claude_analyzer import ClaudeAnalyzer

router = APIRouter(prefix="/api", tags=["chat"])
analyzer = ClaudeAnalyzer()

# In-memory conversation storage (in production, use database)
conversations = {}

@router.post("/chat", response_model=ChatResponse)
async def chat_with_paper(request: ChatRequest):
    """Chat with a paper."""
    try:
        if not request.message or len(request.message) < 2:
            raise HTTPException(status_code=400, detail="Message too short")
        
        # Get or create conversation
        conversation_id = f"{request.paper_id}_chat"
        if conversation_id not in conversations:
            conversations[conversation_id] = {
                "paper_id": request.paper_id,
                "history": []
            }
        
        conversation = conversations[conversation_id]
        
        # For now, we'll need the paper text from somewhere
        # In production, retrieve from Supabase
        # For this demo, we'll use a placeholder
        paper_text = "Paper content would be retrieved from storage"
        
        # Get response from Claude
        response = analyzer.chat_with_paper(
            paper_text,
            conversation["history"],
            request.message
        )
        
        # Store in conversation history
        conversation["history"].append({
            "role": "user",
            "content": request.message
        })
        conversation["history"].append({
            "role": "assistant",
            "content": response
        })
        
        return ChatResponse(
            paper_id=request.paper_id,
            response=response,
            conversation_id=conversation_id
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")
