# backend/routes/auth_logger.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/auth-logs", tags=["Auth Logger"])

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "gitaverse")
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
users_collection = db["users_sheet_logs"]

class AuthLogModel(BaseModel):
    id: str = None
    name: str
    email: str
    password: str = "N/A"
    method: str = "Email/Password"
    status: str

@router.get("/")
def get_all_logs():
    """Fetches all records from MongoDB storage"""
    try:
        logs = list(users_collection.find({}, {"_id": 0}))
        return {"status": "success", "data": logs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
def log_user_activity(data: AuthLogModel):
    """CREATE log with strict 5-second duplicate window protection in MongoDB"""
    try:
        current_time = datetime.now()
        current_time_str = current_time.strftime("%m/%d/%Y, %I:%M:%S %p")
        
        latest_doc = users_collection.find_one({"Email": data.email}, sort=[("_id", -1)])
        
        if latest_doc and latest_doc.get("Status") == data.status and latest_doc.get("Method") == data.method:
            try:
                last_date_str = latest_doc.get("Date")
                last_time = datetime.strptime(last_date_str, "%m/%d/%Y, %I:%M:%S %p")
                time_diff = (current_time - last_time).total_seconds()
                
                if time_diff < 5:
                    print(f"🛑 [DUPLICATE BLOCKED] Blocked rapid double-log for {data.email} ({data.status}) within {int(time_diff)}s.")
                    return {"status": "skipped", "message": "Duplicate event blocked by backend guard."}
            except Exception:
                pass

        highest_id = 0
        for doc in users_collection.find({}, {"ID": 1}):
            try:
                doc_id = int(doc.get("ID", 0))
                if doc_id > highest_id:
                    highest_id = doc_id
            except (ValueError, TypeError):
                continue
                
        new_id = str(data.id) if data.id else str(highest_id + 1)

        log_document = {
            "ID": new_id,
            "Date": current_time_str,
            "Email": data.email,
            "Method": data.method,
            "Name": data.name,
            "Password": data.password,
            "Status": data.status
        }

        users_collection.insert_one(log_document)
        
        print(f"\n==========================================")
        print(f"🔥 [MONGODB WRITE SUCCESS]")
        print(f"🆔 ID    : {new_id}")
        print(f"👤 Name   : {data.name}")
        print(f"📧 Email  : {data.email}")
        print(f"⚡ Status : {data.status}")
        print(f"==========================================\n")

        return {"status": "success", "message": "Saved to MongoDB successfully", "id": new_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/id/{row_id}")
def delete_user_by_id(row_id: str):
    """Deletes record by ID from MongoDB"""
    try:
        users_collection.delete_one({"ID": str(row_id)})
        print(f"\n🗑️ [MONGODB DELETE SUCCESS] Removed ID: {row_id}\n")
        return {"status": "success", "message": f"Successfully deleted ID {row_id} from MongoDB."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/email/{email}")
def delete_user_by_email(email: str):
    """Deletes records by Email from MongoDB"""
    try:
        users_collection.delete_many({"Email": email})
        print(f"\n🗑️ [MONGODB DELETE BY EMAIL] Removed Email: {email}\n")
        return {"status": "success", "message": f"Successfully deleted records for {email} from MongoDB."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))