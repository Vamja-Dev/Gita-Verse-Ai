# backend/routes/shlokas.py
from fastapi import APIRouter, HTTPException, Query
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/shlokas", tags=["Shlokas"])

# Connect to local MongoDB instance
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "gitaverse")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
shlokas_collection = db["shlokas"]

@router.get("/")
def get_shlokas(chapter: int = Query(None, description="Filter by chapter number")):
    """Get all shlokas or filter by chapter number"""
    try:
        query = {"chapter_number": chapter} if chapter is not None else {}
        # Exclude MongoDB's internal _id from the response for clean JSON compatibility
        shlokas = list(shlokas_collection.find(query, {"_id": False}).sort([("chapter_number", 1), ("shloka_number", 1)]))
        return shlokas
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{chapter_number}/{shloka_number}")
def get_specific_shloka(chapter_number: int, shloka_number: int):
    """Get a specific shloka by chapter and shloka number"""
    try:
        shloka = shlokas_collection.find_one(
            {"chapter_number": chapter_number, "shloka_number": shloka_number},
            {"_id": False}
        )
        if not shloka:
            raise HTTPException(status_code=404, detail="Shloka not found")
        return shloka
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))