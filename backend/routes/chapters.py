# backend/routes/chapters.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from datetime import datetime
from database.connection import get_db

router = APIRouter(prefix="/chapters", tags=["Chapters"])

# Setup text file logging path
LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "admin-txt")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, "adminchange.txt")

def log_chapter_change(action_type: str, target_id: str, before_data: dict, after_data: dict):
    now = datetime.utcnow()
    
    # 1. Write to local text file
    log_entry = f"""------------------------------------
{now.strftime("%Y-%m-%d %H:%M:%S")}
------------------------------------
Action    : {action_type}
Target ID : {target_id}
BEFORE    : {before_data}
AFTER     : {after_data}

"""
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_entry)

    # 2. Save structured record into MongoDB admin_activity_logs collection using get_db()
    try:
        db = get_db()
        db.admin_activity_logs.insert_one({
            "email": "admin@gitaverse.com",
            "action": action_type,
            "target_id": target_id,
            "timestamp": now,
            "status": "success",
            "changes": {
                "before": before_data,
                "after": after_data
            }
        })
    except Exception as e:
        import traceback
        print(f"❌ MONGODB INSERT FAILED: {e}")
        traceback.print_exc()  # This will print the exact line and error in your terminal

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
        db = get_db()
        chapters = list(db.chapters.find({}, {"_id": False}))
        
        if not chapters:
            pipeline = [
                {"$group": {
                    "_id": "$chapter_number",
                    "chapter_number": {"$first": "$chapter_number"},
                    "number": {"$first": "$chapter_number"}
                }},
                {"$sort": {"chapter_number": 1}}
            ]
            chapters = list(db.shlokas.aggregate(pipeline))
            
        return chapters
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{chapter_number}")
def update_chapter(chapter_number: int, data: ChapterUpdateModel):
    """Update or upsert chapter details in MongoDB, log changes to terminal, text file, and MongoDB"""
    try:
        db = get_db()
        existing_chapter = db.chapters.find_one({"chapter_number": chapter_number})
        
        before_state = {
            "name": existing_chapter.get("name") if existing_chapter else "None (New Record)",
            "slug": existing_chapter.get("slug") if existing_chapter else "None",
            "description": existing_chapter.get("description") if existing_chapter else "None",
            "shloka_count": existing_chapter.get("shloka_count") if existing_chapter else 0
        }

        db.chapters.update_one(
            {"chapter_number": chapter_number},
            {"$set": data.dict()},
            upsert=True
        )

        # Trigger text-file and MongoDB audit logging
        log_chapter_change(
            action_type=f"UPDATE [CHAPTER {chapter_number}]",
            target_id=str(chapter_number),
            before_data=before_state,
            after_data=data.dict()
        )

        return {
            "message": "Chapter updated successfully", 
            "chapter_number": chapter_number,
            "before": before_state,
            "after": data.dict()
        }
    except Exception as e:
        print(f"❌ Error updating chapter {chapter_number}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))