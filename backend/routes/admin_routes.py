# backend/routes/admin_routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
from database.connection import get_db

router = APIRouter(prefix="/admin", tags=["Admin Panel"])

# ==========================================
# MODELS
# ==========================================

class ChapterModel(BaseModel):
    chapter_number: int
    chapter_name: str
    sanskrit_name: Optional[str] = ""
    description: Optional[str] = ""
    chapter_image: Optional[str] = ""
    shloka_count: int

class ShlokaUpdateModel(BaseModel):
    sanskrit: Optional[str] = ""
    transliteration: Optional[str] = ""
    translations: Optional[Dict[str, str]] = {}
    explanations: Optional[Dict[str, str]] = {}
    real_life_example: Optional[Dict[str, Dict[str, str]]] = {}


# ==========================================
# CHAPTER MANAGEMENT ENDPOINTS
# ==========================================

@router.get("/chapters")
def get_admin_chapters():
    db = get_db()
    chapters = list(db.chapters.find({}, {"_id": 0}))
    return {"chapters": chapters}

@router.post("/chapters")
def create_chapter(chapter: ChapterModel):
    db = get_db()
    existing = db.chapters.find_one({"chapter_number": chapter.chapter_number})
    if existing:
        raise HTTPException(status_code=400, detail="Chapter already exists.")
    db.chapters.insert_one(chapter.dict())
    return {"message": "Chapter created successfully", "chapter": chapter.dict()}

@router.put("/chapters/{chapter_number}")
def update_chapter(chapter_number: int, chapter: ChapterModel):
    db = get_db()
    result = db.chapters.update_one(
        {"chapter_number": chapter_number},
        {"$set": chapter.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Chapter not found.")
    return {"message": "Chapter updated successfully"}

@router.delete("/chapters/{chapter_number}")
def delete_chapter(chapter_number: int):
    db = get_db()
    shloka_count = db.shlokas.count_documents({"chapter_number": chapter_number})
    if shloka_count > 0:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot delete Chapter {chapter_number} because it contains {shloka_count} shlokas."
        )
    result = db.chapters.delete_one({"chapter_number": chapter_number})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Chapter not found.")
    return {"message": "Chapter deleted successfully"}


# ==========================================
# SHLOKA MANAGEMENT ENDPOINTS
# ==========================================

@router.get("/shlokas")
def get_admin_shlokas(chapter: Optional[int] = None, search: Optional[str] = None):
    db = get_db()
    query = {}
    if chapter:
        query["chapter_number"] = chapter
    if search:
        query["$or"] = [
            {"sanskrit": {"$regex": search, "$options": "i"}},
            {"transliteration": {"$regex": search, "$options": "i"}},
        ]
    shlokas = list(db.shlokas.find(query, {"_id": 1, "chapter_number": 1, "shloka_number": 1, "sanskrit": 1, "transliteration": 1}).limit(100))
    for s in shlokas:
        s["_id"] = str(s["_id"])
    return {"shlokas": shlokas}

@router.get("/shlokas/{id}")
def get_admin_shloka_by_id(id: str):
    db = get_db()
    try:
        obj_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Shloka ID format.")
    
    shloka = db.shlokas.find_one({"_id": obj_id})
    if not shloka:
        raise HTTPException(status_code=404, detail="Shloka not found.")
    shloka["_id"] = str(shloka["_id"])
    return shloka

@router.put("/shlokas/{id}")
def update_shloka(id: str, payload: ShlokaUpdateModel):
    db = get_db()
    try:
        obj_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Shloka ID format.")

    update_data = {k: v for k, v in payload.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    
    result = db.shlokas.update_one(
        {"_id": obj_id},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Shloka not found.")
    return {"message": "Shloka updated successfully."}