from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalysisRequest, AnalysisResponse, HighlightedSegment, SegmentType
from app.services.claude_analyzer import ClaudeAnalyzer
from app.utils.text_extractor import TextExtractor

router = APIRouter(prefix="/api", tags=["analyze"])
analyzer = ClaudeAnalyzer()

# Color mapping for segment types
SEGMENT_COLORS = {
    SegmentType.IMPORTANCE: "#FCD34D",      # Yellow
    SegmentType.GAP: "#EC4899",             # Pink
    SegmentType.OBJECTIVE: "#10B981",       # Green
    SegmentType.METHOD: "#3B82F6",          # Blue
    SegmentType.FINDINGS: "#A855F7",        # Purple
    SegmentType.IMPLICATIONS: "#F97316",    # Orange
}

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_paper(request: AnalysisRequest):
    """Analyze a paper and return color-coded segments."""
    try:
        if not request.text or len(request.text) < 100:
            raise HTTPException(status_code=400, detail="Text too short for analysis")
        
        # Analyze with Claude
        analysis_result = analyzer.analyze_paper(request.text)
        
        # Process segments and add colors
        segments = []
        for seg in analysis_result.get("segments", []):
            segment_type = SegmentType(seg["type"])
            segments.append(HighlightedSegment(
                type=segment_type,
                text=seg["text"],
                color=SEGMENT_COLORS.get(segment_type, "#CCCCCC"),
                start_index=seg.get("start_index", 0),
                end_index=seg.get("end_index", 0)
            ))
        
        return AnalysisResponse(
            paper_id=request.paper_id,
            segments=segments,
            summary=analysis_result.get("summary", ""),
            literature_review=analysis_result.get("literature_review", [])
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")
