from anthropic import Anthropic
import json
from typing import List, Dict
from config import CLAUDE_API_KEY, CLAUDE_MODEL
from app.models.schemas import SegmentType, HighlightedSegment

class ClaudeAnalyzer:
    """Use Claude to analyze research papers."""
    
    def __init__(self):
        self.client = Anthropic(api_key=CLAUDE_API_KEY)
        self.model = CLAUDE_MODEL
        
    def analyze_paper(self, text: str) -> Dict:
        """Analyze paper and identify segments."""
        
        prompt = f"""Analyze the following research paper text and identify the key academic components.
        
For each component, provide:
1. The exact text snippet from the paper
2. Start and end character positions

Components to identify:
- Importance: Statements about why the research is significant
- Gap: Research gaps or limitations identified
- Objective: The main research objectives/goals
- Method: Methodological approaches used
- Findings: Key results or findings
- Implications: Implications or future work

Paper text:
{text}

Respond in JSON format:
{{
    "segments": [
        {{
            "type": "importance",
            "text": "...",
            "start_index": 0,
            "end_index": 100
        }}
    ],
    "summary": "Brief summary of the paper",
    "literature_review": ["Reference 1", "Reference 2"]
}}
"""
        
        message = self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        
        try:
            response_text = message.content[0].text
            # Extract JSON from response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            json_str = response_text[json_start:json_end]
            result = json.loads(json_str)
            return result
        except (json.JSONDecodeError, IndexError, AttributeError) as e:
            raise Exception(f"Error parsing Claude response: {str(e)}")
    
    def chat_with_paper(self, paper_text: str, conversation_history: List[Dict], user_message: str) -> str:
        """Chat about the paper with context."""
        
        # Build conversation with paper context
        messages = [
            {
                "role": "user",
                "content": f"Here is the research paper to discuss:\n\n{paper_text[:5000]}..."  # Limit context
            },
            {
                "role": "assistant",
                "content": "I've reviewed the paper. I'm ready to answer your questions about its content, methodology, findings, and implications."
            }
        ]
        
        # Add conversation history
        for msg in conversation_history:
            messages.append(msg)
        
        # Add current message
        messages.append({
            "role": "user",
            "content": user_message
        })
        
        response = self.client.messages.create(
            model=self.model,
            max_tokens=1024,
            messages=messages
        )
        
        return response.content[0].text
