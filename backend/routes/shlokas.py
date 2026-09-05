# backend/routes/shlokas.py
from fastapi import APIRouter, HTTPException, Query
import os
import json
from datetime import datetime
from database.connection import get_db
from bson import ObjectId, json_util

router = APIRouter(prefix="/shlokas", tags=["Shlokas"])

LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "admin-txt")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, "adminchange.txt")

def log_shloka_change(action_type: str, target_id: str, before_data: dict, after_data: dict):
    now = datetime.utcnow()
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

    try:
        safe_before = json.loads(json_util.dumps(before_data))
        safe_after = json.loads(json_util.dumps(after_data))

        db = get_db()
        db.admin_activity_logs.insert_one({
            "email": "admin@gitaverse.com",
            "action": action_type,
            "target_id": target_id,
            "timestamp": now,
            "status": "success",
            "changes": {
                "before": safe_before,
                "after": safe_after
            }
        })
        print("Successfully inserted Shloka log into MongoDB `admin_activity_logs`")
    except Exception as e:
        import traceback
        print(f"❌ MONGODB INSERT FAILED: {e}")
        traceback.print_exc()

@router.get("/")
def get_admin_shlokas(chapter: int = Query(None, description="Filter by chapter number")):
    try:
        db = get_db()
        query = {"chapter_number": chapter} if chapter is not None else {}
        shlokas = list(db.shlokas.find(query).sort([("chapter_number", 1), ("shloka_number", 1)]))
        for item in shlokas:
            item["_id"] = str(item["_id"])
        return shlokas
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{shloka_id}")
def get_specific_shloka_by_id(shloka_id: str):
    try:
        db = get_db()
        try:
            obj_id = ObjectId(shloka_id)
            shloka = db.shlokas.find_one({"_id": obj_id})
        except Exception:
            shloka = db.shlokas.find_one({"_id": shloka_id})
            
        if not shloka:
            raise HTTPException(status_code=404, detail="Shloka not found")
            
        shloka["_id"] = str(shloka["_id"])
        return shloka
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{shloka_id}")
def update_shloka_by_id(shloka_id: str, payload: dict):
    try:
        db = get_db()
        try:
            obj_id = ObjectId(shloka_id)
            existing = db.shlokas.find_one({"_id": obj_id})
        except Exception:
            existing = db.shlokas.find_one({"_id": shloka_id})
            obj_id = shloka_id

        if not existing:
            raise HTTPException(status_code=404, detail="Shloka not found")

        before_snapshot = dict(existing)
        if "_id" in before_snapshot:
            before_snapshot["_id"] = str(before_snapshot["_id"])

        payload.pop("_id", None)
        payload["updatedAt"] = datetime.utcnow()

        db.shlokas.update_one({"_id": obj_id}, {"$set": payload})

        after_snapshot = dict(before_snapshot)
        after_snapshot.update(payload)
        
        if isinstance(after_snapshot.get("updatedAt"), datetime):
            after_snapshot["updatedAt"] = after_snapshot["updatedAt"].isoformat()

        log_shloka_change(
            action_type=f"UPDATE [SHLOKA {shloka_id}]",
            target_id=shloka_id,
            before_data=before_snapshot,
            after_data=after_snapshot
        )

        return {"status": "success", "message": "Shloka updated successfully and logged"}
    except Exception as e:
        print(f"❌ Error updating shloka {shloka_id} -> {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))