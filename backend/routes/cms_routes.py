# backend/routes/cms_routes.py
import os
from datetime import datetime
from fastapi import APIRouter, HTTPException
from database.connection import get_db
from bson import ObjectId

router = APIRouter(prefix="/admin/cms", tags=["CMS Content Management"])
VALID_SECTIONS = ["vedas", "yugas", "timeline", "characters", "map", "home"]

LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "admin-txt")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, "adminchange.txt")

def log_admin_change(action_type: str, target_id: str, before_data: dict, after_data: dict):
    now = datetime.now()
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

@router.get("/{section}")
def get_cms_items(section: str):
    if section not in VALID_SECTIONS:
        raise HTTPException(status_code=400, detail="Invalid section")
    db = get_db()
    items = list(db[section].find({}))
    for item in items:
        item["_id"] = str(item["_id"])
    return {"status": "success", "data": items}

@router.post("/{section}")
def create_cms_item(section: str, payload: dict):
    if section not in VALID_SECTIONS:
        raise HTTPException(status_code=400, detail="Invalid section")
    db = get_db()
    payload.pop("_id", None)
    result = db[section].insert_one(payload)
    new_id = str(result.inserted_id)
    
    log_admin_change(
        action_type=f"CREATE [{section.upper()}]",
        target_id=new_id,
        before_data={},
        after_data=payload
    )
    return {"status": "success", "id": new_id}

@router.put("/{section}/{item_id}")
def update_cms_item(section: str, item_id: str, payload: dict):
    if section not in VALID_SECTIONS:
        raise HTTPException(status_code=400, detail="Invalid section")
    db = get_db()
    
    try:
        obj_id = ObjectId(item_id)
        existing = db[section].find_one({"_id": obj_id})
    except Exception:
        existing = db[section].find_one({"id": int(item_id) if item_id.isdigit() else item_id})
        obj_id = existing["_id"] if existing else None

    if not existing:
        raise HTTPException(status_code=404, detail="Item not found")

    before_snapshot = dict(existing)
    before_snapshot["_id"] = str(before_snapshot["_id"])

    payload.pop("_id", None)
    db[section].update_one({"_id": obj_id}, {"$set": payload})
    
    after_snapshot = dict(before_snapshot)
    after_snapshot.update(payload)

    log_admin_change(
        action_type=f"UPDATE [{section.upper()}]",
        target_id=str(item_id),
        before_data=before_snapshot,
        after_data=after_snapshot
    )

    return {"status": "success", "message": "Item updated successfully and logged"}

@router.delete("/{section}/{item_id}")
def delete_cms_item(section: str, item_id: str):
    if section not in VALID_SECTIONS:
        raise HTTPException(status_code=400, detail="Invalid section")
    db = get_db()
    
    try:
        obj_id = ObjectId(item_id)
        existing = db[section].find_one({"_id": obj_id})
    except Exception:
        existing = db[section].find_one({"id": int(item_id) if item_id.isdigit() else item_id})
        obj_id = existing["_id"] if existing else None

    if not existing:
        raise HTTPException(status_code=404, detail="Item not found")

    before_snapshot = dict(existing)
    before_snapshot["_id"] = str(before_snapshot["_id"])

    db[section].delete_one({"_id": obj_id})

    log_admin_change(
        action_type=f"DELETE [{section.upper()}]",
        target_id=str(item_id),
        before_data=before_snapshot,
        after_data={}
    )

    return {"status": "success", "message": "Item deleted and logged successfully"}