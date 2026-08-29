# backend/routes/auth_logger.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
import os
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/auth-logs", tags=["Auth Logger"])

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "gitaverse")
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
users_collection = db["users_sheet_logs"]

SHEETDB_URL = "https://sheetdb.io/api/v1/x84p8m28inivm"

class AuthLogModel(BaseModel):
    id: str = None
    name: str
    email: str
    password: str = "N/A"
    method: str = "Email/Password"
    status: str

@router.get("/")
def get_all_logs():
    """Fetches all records from MongoDB primary storage"""
    try:
        logs = list(users_collection.find({}, {"_id": 0}))
        return {"status": "success", "data": logs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
def log_user_activity(data: AuthLogModel):
    """Dual-Primary CREATE with strict 5-second duplicate window protection"""
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

        sheet_payload = {
            "data": [{
                "ID": new_id,
                "Date": current_time_str,
                "Email": data.email,
                "Method": data.method,
                "Name": data.name,
                "Password": data.password,
                "Status": data.status
            }]
        }
        requests.post(SHEETDB_URL, json=sheet_payload, timeout=10)
        
        print(f"\n==========================================")
        print(f"🔥 [DUAL-PRIMARY WRITE SUCCESS]")
        print(f"🆔 ID    : {new_id}")
        print(f"👤 Name   : {data.name}")
        print(f"📧 Email  : {data.email}")
        print(f"⚡ Status : {data.status}")
        print(f"==========================================\n")

        return {"status": "success", "message": "Saved to both storages successfully", "id": new_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/id/{row_id}")
def delete_user_by_id(row_id: str):
    """Dual-Primary DELETE BY ID: Deletes from MongoDB & Google Sheets"""
    try:
        users_collection.delete_one({"ID": str(row_id)})
        requests.delete(f"{SHEETDB_URL}/ID/{requests.utils.quote(str(row_id))}", timeout=10)

        print(f"\n🗑️ [DUAL-PRIMARY DELETE SUCCESS] Removed ID: {row_id} from MongoDB and Google Sheets.\n")
        return {"status": "success", "message": f"Successfully deleted ID {row_id} from both storages."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/email/{email}")
def delete_user_by_email(email: str):
    """Dual-Primary DELETE BY EMAIL: Deletes from MongoDB & Google Sheets"""
    try:
        users_collection.delete_many({"Email": email})
        requests.delete(f"{SHEETDB_URL}/Email/{requests.utils.quote(email)}", timeout=10)

        print(f"\n🗑️ [DUAL-PRIMARY DELETE BY EMAIL] Removed Email: {email} from MongoDB and Google Sheets.\n")
        return {"status": "success", "message": f"Successfully deleted records for {email} from both storages."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))