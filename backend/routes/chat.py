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
    cleaned = text.strip().lower()
    
    # 1. Reject very short inputs (e.g., "hi", "ok", "2+2")
    if len(cleaned) < 4:
        return False
        
    # 2. Reject pure math equations, numbers, or random symbols
    if re.fullmatch(r'[\d\+\-\*\/\=\(\)\s\&\*\%\$\#\@\!\^\.\,]+', cleaned):
        return False
        
    # 3. Ensure there are at least 3 actual alphabetical letters
    alpha_count = sum(c.isalpha() for c in cleaned)
    if alpha_count < 3:
        return False

    # 4. Reject mathematical patterns (e.g., "what is 2 + 2", "50 * 4", "100 / 5", "2x + 4 = 10")
    math_patterns = [
        r'\d+\s*[\+\-\*\/\^%]\s*\d+',       # e.g., 2 + 2, 50*4, 100 / 5
        r'\d+\s*=\s*\d+',                   # e.g., 5 = 5
        r'[a-z]\s*[\+\-\*\/=]\s*\d+',       # e.g., x + 5, 2x = 10
        r'\b\d+\s*(plus|minus|times|multiplied by|divided by)\s*\d+\b'  # e.g. 5 plus 5
    ]
    if any(re.search(pattern, cleaned) for pattern in math_patterns):
        return False

    # 5. Reject calculation & arithmetic prompt keywords
    math_calculation_keywords = [
        "calculate", "calculation", "compute", "computation",
        "what is the sum", "sum of", "multiply", "multiplied by",
        "divide", "divided by", "subtract", "subtraction",
        "square root", "cube root", "solve equation", "solve for",
        "derivative", "integral", "sin(", "cos(", "tan(",
        "algebra", "arithmetic", "trigonometry", "logarithm",
        "percentage of", "what is the value of", "math problem", "maths"
    ]
    if any(keyword in cleaned for keyword in math_calculation_keywords):
        return False
        
    # 6. Reject non-life problem intents (image generation, coding, weather, general trivia)
    forbidden_keywords = [
        "generate image", "create image", "draw", "paint", "create photo", "make an image",
        "write code", "python code", "javascript", "html", "css", "solve bug", "coding",
        "weather", "temperature", "stock price", "crypto", "bitcoin",
        "recipe", "how to cook", "movie", "song lyrics"
    ]
    if any(keyword in cleaned for keyword in forbidden_keywords):
        return False
        
    return True

@router.post("/gita-chat")
def gita_chat(req: ChatRequest):
    query = req.message.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # 0. Validate if input is a genuine life problem or spiritual dilemma
    if not is_valid_life_problem(query):
        return {
            "success": False,
            "message": "Please write a meaningful sentence or life problem so God Krishna can guide you properly. Math calculations, image generation, and coding prompts are not supported."
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

    # Check if best match score is within acceptable relevance bounds
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