# backend/routes/auth_logger.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/auth-log", tags=["Auth Logger"])

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "gitaverse")
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
users_collection = db["users_sheet_logs"]

class AuthLogModel(BaseModel):
    id: str = None
    name: str
    email: str
    method: str = "Email/Password"
    status: str

@router.post("/")
def log_user_activity(data: AuthLogModel):
    """Receives live frontend auth events, saves to MongoDB, and prints to terminal"""
    try:
        current_time = datetime.now().strftime("%m/%d/%Y, %I:%M:%S %p")
        
        existing_count = users_collection.count_documents({})
        new_id = str(existing_count + 1)

        log_document = {
            "ID": data.id or new_id,
            "Date": current_time,
            "Email": data.email,
            "Method": data.method,
            "Name": data.name,
            "Password": "N/A",
            "Status": data.status
        }

        # Save instantly to MongoDB
        users_collection.insert_one(log_document)
        
        # Print a clear live notification in your backend terminal
        print(f"\n==========================================")
        print(f"🔥 [LIVE AUTH EVENT CAPTURED]")
        print(f"👤 Name   : {data.name}")
        print(f"📧 Email  : {data.email}")
        print(f"⚡ Status : {data.status}")
        print(f"🕒 Time   : {current_time}")
        print(f"📂 Target : MongoDB (`users_sheet_logs`) & Google Sheets")
        print(f"==========================================\n")

        return {"status": "success", "message": "Auth activity logged successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))