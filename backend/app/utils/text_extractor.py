import fitz  # PyMuPDF
import docx
from typing import Tuple

class TextExtractor:
    """Extract text from PDF and DOCX files."""
    
    @staticmethod
    def extract_from_pdf(file_path: str) -> str:
        """Extract text from PDF file."""
        text = ""
        try:
            with fitz.open(file_path) as pdf:
                for page_num, page in enumerate(pdf):
                    text += f"\n--- Page {page_num + 1} ---\n"
                    text += page.get_text()
            return text.strip()
        except Exception as e:
            raise Exception(f"Error extracting PDF: {str(e)}")
    
    @staticmethod
    def extract_from_docx(file_path: str) -> str:
        """Extract text from DOCX file."""
        text = ""
        try:
            doc = docx.Document(file_path)
            for para in doc.paragraphs:
                if para.text.strip():
                    text += para.text + "\n"
            return text.strip()
        except Exception as e:
            raise Exception(f"Error extracting DOCX: {str(e)}")
    
    @staticmethod
    def extract_text(file_path: str) -> str:
        """Extract text from PDF or DOCX."""
        if file_path.endswith('.pdf'):
            return TextExtractor.extract_from_pdf(file_path)
        elif file_path.endswith('.docx'):
            return TextExtractor.extract_from_docx(file_path)
        else:
            raise ValueError("Unsupported file format")
