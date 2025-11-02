from fastapi import APIRouter, UploadFile, File, HTTPException
import aiofiles
import os
import uuid
from datetime import datetime
from config import MAX_FILE_SIZE, ALLOWED_EXTENSIONS
from app.models.schemas import UploadResponse
from app.utils.text_extractor import TextExtractor
from app.services.supabase_manager import SupabaseManager

router = APIRouter(prefix="/api", tags=["upload"])
supabase = SupabaseManager()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=UploadResponse)
async def upload_paper(file: UploadFile = File(...)):
    """Upload a research paper (PDF or DOCX)."""
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No filename provided")
        
        # Check file extension
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"File type not allowed. Allowed types: {ALLOWED_EXTENSIONS}"
            )
        
        # Generate unique paper ID
        paper_id = str(uuid.uuid4())
        
        # Save file temporarily
        temp_file_path = os.path.join(UPLOAD_DIR, f"{paper_id}_{file.filename}")
        
        async with aiofiles.open(temp_file_path, 'wb') as f:
            content = await file.read()
            
            # Check file size
            if len(content) > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=413,
                    detail=f"File too large. Max size: {MAX_FILE_SIZE / 1024 / 1024}MB"
                )
            
            await f.write(content)
        
        # Extract text
        try:
            extracted_text = TextExtractor.extract_text(temp_file_path)
        except Exception as e:
            os.remove(temp_file_path)
            raise HTTPException(status_code=400, detail=f"Error extracting text: {str(e)}")
        
        # Upload to Supabase
        try:
            storage_path = supabase.upload_file(temp_file_path, f"{paper_id}/{file.filename}")
        except Exception as e:
            os.remove(temp_file_path)
            raise HTTPException(status_code=500, detail=f"Error uploading to storage: {str(e)}")
        
        # Save metadata
        metadata = {
            "id": paper_id,
            "filename": file.filename,
            "file_size": len(content),
            "storage_path": storage_path,
            "uploaded_at": datetime.now().isoformat(),
            "status": "uploaded"
        }
        
        try:
            supabase.save_paper_metadata(paper_id, metadata)
        except Exception as e:
            # Log but don't fail
            print(f"Warning: Could not save metadata: {str(e)}")
        
        # Clean up temp file
        os.remove(temp_file_path)
        
        return UploadResponse(
            paper_id=paper_id,
            filename=file.filename,
            message="File uploaded successfully"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
