from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import re
from services.retrieval_service import RetrievalService
from services.ranking_service import RankingService
from services.llm_service import LLMService

router = APIRouter()

retrieval_service = RetrievalService()
ranking_service = RankingService()
llm_service = LLMService()

MIN_SCORE_THRESHOLD = float(os.getenv("MIN_RETRIEVAL_SCORE", "0.5"))

class ChatRequest(BaseModel):
    message: str

def is_valid_life_problem(text: str) -> bool:
    cleaned = text.strip()
    
    # Reject short inputs (e.g. "hi", "ok")
    if len(cleaned) < 4:
        return False
        
    # Reject pure math equations, numbers, or random symbols (like "2+2" or "&&*(&*")
    if re.fullmatch(r'[\d\+\-\*\/\=\(\)\s\&\*\%\$\#\@\!]+', cleaned):
        return False
        
    # Ensure there are at least 3 actual alphabetical letters
    alpha_count = sum(c.isalpha() for c in cleaned)
    if alpha_count < 3:
        return False
        
    return True

@router.post("/gita-chat")
def gita_chat(req: ChatRequest):
    query = req.message.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # 0. Validate if input is a genuine life problem or sentence
    if not is_valid_life_problem(query):
        return {
            "success": False,
            "message": "Please write a meaningful sentence or life problem so Krishna can guide you properly."
        }

    # 1. Retrieve top matching candidates
    candidates = retrieval_service.retrieve(query, top_k=10)
    
    if not candidates:
        return {
            "success": False,
            "message": "No strong direct teaching was found for this situation. Please describe your situation in a bit more detail."
        }

    # 2. Re-rank to get the best primary match and supporting options
    primary, supporting = ranking_service.rank_candidates(query, candidates)

    # Check if best match score is within acceptable relevance bounds (lower L2 distance is better)
    best_score = primary.get('score', 999.0)
    
    # Generate the AI personalized explanation connecting the user's query to the shloka
    why_relevant = llm_service.generate_connection(query, primary)

    return {
        "success": True,
        "user_problem": query,
        "primary_shloka": {
            "id": primary.get('id'),
            "chapter": primary.get('chapter'),
            "shloka_number": primary.get('shloka_number'),
            "sanskrit": primary.get('sanskrit'),
            "transliteration": primary.get('transliteration'),
            "translations": primary.get('translations'),
            "explanations": primary.get('explanations'),
            "real_life_example": primary.get('real_life_example')
        },
        "why_relevant": why_relevant,
        "supporting_shlokas": [
            {
                "id": s.get('id'),
                "chapter": s.get('chapter'),
                "shloka_number": s.get('shloka_number'),
                "translations": s.get('translations')
            } for s in supporting
        ],
        "retrieval_score": best_score
    }