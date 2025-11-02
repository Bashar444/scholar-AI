from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from config import ALLOWED_ORIGINS
from app.api import upload, analyze, chat

# Create FastAPI app
app = FastAPI(
    title="Scholar AI Backend",
    description="AI-powered research paper analysis API",
    version="0.1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(upload.router)
app.include_router(analyze.router)
app.include_router(chat.router)

@app.get("/")
def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Scholar AI API",
        "docs": "/docs",
        "version": "0.1.0"
    }

@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
