from supabase import create_client
from config import SUPABASE_URL, SUPABASE_KEY, SUPABASE_BUCKET
import os
from datetime import datetime

class SupabaseManager:
    """Manage Supabase storage and database operations."""
    
    def __init__(self):
        self.supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        self.bucket = SUPABASE_BUCKET
    
    def upload_file(self, file_path: str, file_name: str) -> str:
        """Upload file to Supabase storage."""
        try:
            with open(file_path, 'rb') as f:
                file_data = f.read()
            
            path = f"{datetime.now().strftime('%Y/%m/%d')}/{file_name}"
            
            self.supabase.storage.from_(self.bucket).upload(
                path,
                file_data
            )
            
            return path
        except Exception as e:
            raise Exception(f"Error uploading file: {str(e)}")
    
    def download_file(self, path: str) -> bytes:
        """Download file from Supabase storage."""
        try:
            response = self.supabase.storage.from_(self.bucket).download(path)
            return response
        except Exception as e:
            raise Exception(f"Error downloading file: {str(e)}")
    
    def delete_file(self, path: str) -> bool:
        """Delete file from Supabase storage."""
        try:
            self.supabase.storage.from_(self.bucket).remove([path])
            return True
        except Exception as e:
            raise Exception(f"Error deleting file: {str(e)}")
    
    def save_paper_metadata(self, paper_id: str, metadata: dict) -> bool:
        """Save paper metadata to Supabase database."""
        try:
            # This assumes you have a 'papers' table set up
            self.supabase.table('papers').insert(metadata).execute()
            return True
        except Exception as e:
            raise Exception(f"Error saving metadata: {str(e)}")
    
    def get_paper_metadata(self, paper_id: str) -> dict:
        """Retrieve paper metadata from database."""
        try:
            response = self.supabase.table('papers').select('*').eq('id', paper_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            raise Exception(f"Error retrieving metadata: {str(e)}")
