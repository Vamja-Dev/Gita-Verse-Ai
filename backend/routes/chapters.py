# backend/routes/chapters.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/chapters", tags=["Chapters"])

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "gitaverse")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
chapters_collection = db["chapters"]
shlokas_collection = db["shlokas"]

class ChapterUpdateModel(BaseModel):
    chapter_number: int
    name: str
    slug: str = None
    description: str = None
    shloka_count: int = 0

@router.get("/")
def get_chapters():
    """Get all chapters from MongoDB, or aggregate them from shlokas if empty"""
    try:
        chapters = list(chapters_collection.find({}, {"_id": False}))
        
        if not chapters:
            pipeline = [
                {"$group": {
                    "_id": "$chapter_number",
                    "chapter_number": {"$first": "$chapter_number"},
                    "number": {"$first": "$chapter_number"}
                }},
                {"$sort": {"chapter_number": 1}}
            ]
            chapters = list(shlokas_collection.aggregate(pipeline))
            
        return chapters
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{chapter_number}")
def update_chapter(chapter_number: int, data: ChapterUpdateModel):
    """Update or upsert chapter details in MongoDB and log before/after changes to the terminal"""
    try:
        existing_chapter = chapters_collection.find_one({"chapter_number": chapter_number})
        
        before_state = {
            "name": existing_chapter.get("name") if existing_chapter else "None (New Record)",
            "slug": existing_chapter.get("slug") if existing_chapter else "None",
            "description": existing_chapter.get("description") if existing_chapter else "None",
            "shloka_count": existing_chapter.get("shloka_count") if existing_chapter else 0
        }

        result = chapters_collection.update_one(
            {"chapter_number": chapter_number},
            {"$set": data.dict()},
            upsert=True
        )

        print("\n" + "="*50)
        print(f"🔄 CHAPTER {chapter_number} UPDATED SUCCESSFULLY")
        print("="*50)
        print("--- BEFORE ---")
        for key, val in before_state.items():
            print(f"  {key}: {val}")
        print("--- AFTER ---")
        for key, val in data.dict().items():
            print(f"  {key}: {val}")
        print("="*50 + "\n")

        return {
            "message": "Chapter updated successfully", 
            "chapter_number": chapter_number,
            "before": before_state,
            "after": data.dict()
        }
    except Exception as e:
        print(f"❌ Error updating chapter {chapter_number}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))