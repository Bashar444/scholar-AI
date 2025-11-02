from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class SegmentType(str, Enum):
    IMPORTANCE = "importance"
    GAP = "gap"
    OBJECTIVE = "objective"
    METHOD = "method"
    FINDINGS = "findings"
    IMPLICATIONS = "implications"

class HighlightedSegment(BaseModel):
    type: SegmentType
    text: str
    color: str
    start_index: int
    end_index: int

class PaperAnalysis(BaseModel):
    paper_id: str
    segments: List[HighlightedSegment]
    summary: str
    literature_review: List[str]
    analyzed_at: datetime = Field(default_factory=datetime.now)

class Paper(BaseModel):
    id: str
    filename: str
    content: str
    uploaded_at: datetime = Field(default_factory=datetime.now)
    analysis: Optional[PaperAnalysis] = None

class ChatMessage(BaseModel):
    id: str
    paper_id: str
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: datetime = Field(default_factory=datetime.now)

class UploadResponse(BaseModel):
    paper_id: str
    filename: str
    message: str

class AnalysisRequest(BaseModel):
    paper_id: str
    text: str

class AnalysisResponse(BaseModel):
    paper_id: str
    segments: List[HighlightedSegment]
    summary: str
    literature_review: List[str]

class ChatRequest(BaseModel):
    paper_id: str
    message: str

class ChatResponse(BaseModel):
    paper_id: str
    response: str
    conversation_id: str
