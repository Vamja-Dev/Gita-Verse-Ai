# backend/routes/chapters.py
from fastapi import APIRouter, HTTPException
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