# backend/routes/public_routes.py
from fastapi import APIRouter, HTTPException
from database.connection import get_db

router = APIRouter(prefix="", tags=["Public Routes"])

@router.get("/chapters")
def get_public_chapters():
    """Fetches all chapters dynamically for the website"""
    try:
        db = get_db()
        chapters = list(db["chapters"].find({}, {"_id": 0}))
        return {"status": "success", "data": chapters}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/shlokas")
def get_public_shlokas():
    """Fetches all shlokas dynamically for the website and RAG chat"""
    try:
        db = get_db()
        shlokas = list(db["shlokas"].find({}, {"_id": 0}))
        return {"status": "success", "data": shlokas}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/media")
def get_public_media():
    """Fetches uploaded media files/metadata for website usage"""
    try:
        db = get_db()
        media = list(db["media"].find({}, {"_id": 0}))
        return {"status": "success", "data": media}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))