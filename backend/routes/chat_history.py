# backend/routes/chat_history.py
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime, timezone
from bson import ObjectId
from database.connection import get_db

router = APIRouter()

class ChatHistoryCreateRequest(BaseModel):
    user_email: str
    user_name: Optional[str] = "Seeker"
    prompt: str
    response: Dict[str, Any]

def get_user_id_from_email(email: str) -> str:
    """Derives a stable unique user identifier from email."""
    return email.strip().lower()

@router.post("/chat-history")
def save_chat_history(req: ChatHistoryCreateRequest, x_user_email: Optional[str] = Header(None)):
    db = get_db()
    
    # Use email from header if available, otherwise fallback to request payload
    email = x_user_email or req.user_email
    if not email or email == 'N/A':
        raise HTTPException(status_code=401, detail="Authentication required to save history.")

    user_id = get_user_id_from_email(email)
    now = datetime.now(timezone.utc).isoformat()

    document = {
        "user_id": user_id,
        "user_email": email,
        "user_name": req.user_name,
        "problem": req.prompt,
        "response": req.response,
        "created_at": now,
        "updated_at": now
    }

    result = db.chat_history.insert_one(document)
    return {
        "success": True,
        "history_id": str(result.inserted_id)
    }

@router.get("/chat-history")
def get_chat_history(x_user_email: Optional[str] = Header(None)):
    db = get_db()
    if not x_user_email or x_user_email == 'N/A':
        raise HTTPException(status_code=401, detail="Authentication required.")

    user_id = get_user_id_from_email(x_user_email)
    
    # Query sorted newest first
    cursor = db.chat_history.find({"user_id": user_id}).sort("created_at", -1)
    
    history_list = []
    for doc in cursor:
        history_list.append({
            "id": str(doc["_id"]),
            "timestamp": doc.get("created_at"),
            "prompt": doc.get("problem"),
            "response": doc.get("response")
        })

    return {
        "success": True,
        "history": history_list
    }

@router.delete("/chat-history/{history_id}")
def delete_chat_history(history_id: str, x_user_email: Optional[str] = Header(None)):
    db = get_db()
    if not x_user_email or x_user_email == 'N/A':
        raise HTTPException(status_code=401, detail="Authentication required.")

    user_id = get_user_id_from_email(x_user_email)

    try:
        obj_id = ObjectId(history_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid history ID format.")

    # Verify ownership before deleting
    result = db.chat_history.delete_one({"_id": obj_id, "user_id": user_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="History record not found or unauthorized.")

    return {"success": True, "message": "History entry deleted successfully."}