# backend/routes/admin_media.py
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from database.connection import get_db
import shutil
import os
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/admin/media", tags=["Admin Media"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/")
def get_media():
    try:
        db = get_db()
        media_items = list(db["media"].find({}, {"_id": 1, "name": 1, "filename": 1, "category": 1, "chapterNumber": 1, "slotNumber": 1, "url": 1, "altText": 1}))
        for item in media_items:
            item["_id"] = str(item["_id"])
        return {"status": "success", "media": media_items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def upload_media(
    file: UploadFile = File(...),
    name: str = Form(...),
    category: str = Form(...),
    chapterNumber: int = Form(None),
    slotNumber: int = Form(None),
    altText: str = Form("")
):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        db = get_db()
        doc = {
            "name": name,
            "filename": file.filename,
            "category": category,
            "chapterNumber": chapterNumber,
            "slotNumber": slotNumber,
            "url": f"/uploads/{file.filename}",
            "altText": altText,
            "createdAt": datetime.utcnow().isoformat()
        }
        
        result = db["media"].insert_one(doc)
        return {"status": "success", "message": "Image uploaded successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{media_id}")
def delete_media(media_id: str):
    try:
        db = get_db()
        result = db["media"].delete_one({"_id": ObjectId(media_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Media not found")
        return {"status": "success", "message": "Image deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))