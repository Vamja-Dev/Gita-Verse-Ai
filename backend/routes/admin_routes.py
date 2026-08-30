# backend/routes/admin_routes.py
import os
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
from database.connection import get_db

router = APIRouter(prefix="/admin", tags=["Admin Panel"])

# ==========================================
# AUDIT LOGGER HELPER
# ==========================================
LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "admin-txt")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, "adminchange.txt")

def log_admin_change(action_type: str, target_id: str, before_data: dict, after_data: dict):
    """Appends structured before/after changes with dates and timestamps to adminchange.txt"""
    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    time_str = now.strftime("%H:%M:%S")

    log_entry = f"""------------------------------------
{date_str}
------------------------------------
Time   : {time_str}
Action : {action_type}
Target : {target_id}
BEFORE : {before_data}
AFTER  : {after_data}

"""
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_entry)


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
    existing_chapter = db.chapters.find_one({"chapter_number": chapter_number})
    old_data = existing_chapter if existing_chapter else {}
    if "_id" in old_data:
        old_data["_id"] = str(old_data["_id"])
        
    new_data = chapter.dict()

    changes = []
    for key, new_val in new_data.items():
        old_val = old_data.get(key)
        if old_val != new_val:
            changes.append(f"Changed {key} from '{old_val}' to '{new_val}'")

    summary_text = ", ".join(changes) if changes else "No values were changed"

    db.chapters.update_one(
        {"chapter_number": chapter_number},
        {"$set": new_data},
        upsert=True
    )

    # Log to adminchange.txt
    log_admin_change(
        action_type="Update Chapter",
        target_id=f"Chapter {chapter_number}",
        before_data=old_data,
        after_data=new_data
    )

    print("\n" + "="*50)
    print(f"🔄 CHAPTER {chapter_number} UPDATE SUMMARY:")
    print(f"  {summary_text}")
    print("="*50 + "\n")

    return {
        "message": "Chapter updated successfully",
        "summary": summary_text,
        "changes": changes
    }

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

    existing = db.shlokas.find_one({"_id": obj_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Shloka not found.")

    # Prepare copy of existing doc for log snapshot
    before_snapshot = dict(existing)
    before_snapshot["_id"] = str(before_snapshot["_id"])

    update_data = {k: v for k, v in payload.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    
    changes = []
    after_snapshot = dict(before_snapshot)
    after_snapshot.update({k: v for k, v in update_data.items() if k != "updatedAt"})

    for key, new_val in update_data.items():
        if key == "updatedAt":
            continue
        old_val = existing.get(key)
        if old_val != new_val:
            changes.append(f"Changed {key}")

    summary_text = ", ".join(changes) if changes else "No values were changed"

    db.shlokas.update_one(
        {"_id": obj_id},
        {"$set": update_data}
    )

    # Log to adminchange.txt automatically
    log_admin_change(
        action_type="Update Shloka",
        target_id=id,
        before_data=before_snapshot,
        after_data=after_snapshot
    )

    print("\n" + "="*50)
    print(f"🔄 SHLOKA {id} UPDATED SUCCESSFULLY")
    print(f"Summary: {summary_text}")
    print("="*50 + "\n")

    return {
        "message": "Shloka updated successfully.",
        "summary": summary_text,
        "changes": changes
    }


# ==========================================
# USER LOGS & DUAL-PRIMARY DELETION ENDPOINT
# ==========================================
@router.delete("/logs/{log_id}")
def delete_user_log(log_id: str):
    db = get_db()
    
    doc = None
    try:
        obj_id = ObjectId(log_id)
        doc = db.users_sheet_logs.find_one({"_id": obj_id})
    except Exception:
        pass
    
    if not doc:
        doc = db.users_sheet_logs.find_one({
            "$or": [{"ID": log_id}, {"id": log_id}, {"id": int(log_id) if log_id.isdigit() else log_id}]
        })

    sheet_row_id = str(doc.get("ID") or doc.get("id") or log_id).strip() if doc else log_id

    try:
        if doc:
            mongo_result = db.users_sheet_logs.delete_one({"_id": doc["_id"]})
        else:
            obj_id = ObjectId(log_id)
            mongo_result = db.users_sheet_logs.delete_one({"_id": obj_id})
    except Exception:
        mongo_result = db.users_sheet_logs.delete_one({
            "$or": [{"ID": log_id}, {"id": log_id}, {"id": int(log_id) if log_id.isdigit() else log_id}]
        })

    sheets_deleted = False
    try:
        sheetdb_url = f"https://sheetdb.io/api/v1/x84p8m28inivm/ID/{sheet_row_id}?sheet=Locked"
        headers = {"User-Agent": "GitaVerse-Backend-Sync/1.0"}
        response = requests.delete(sheetdb_url, headers=headers, timeout=10)
        
        if response.status_code in [200, 204]:
            res_data = response.json() if response.content else {}
            if res_data.get("deleted", 0) > 0 or response.status_code == 200:
                sheets_deleted = True
    except Exception as e:
        print(f"⚠️ SheetDB deletion warning: {str(e)}")

    print("\n" + "="*50)
    print(f"🗑️ [DUAL-PRIMARY DELETE SUCCESS]")
    print(f"   Target Log ID: {log_id} | Sheet Row ID Used: {sheet_row_id}")
    print(f"   MongoDB Deleted: {mongo_result.deleted_count > 0}")
    print(f"   Google Sheets Deleted: {sheets_deleted}")
    print("="*50 + "\n")

    return {
        "message": f"Log {log_id} deleted successfully from MongoDB and Admin Panel",
        "mongo_deleted": mongo_result.deleted_count > 0,
        "sheets_deleted": sheets_deleted
    }