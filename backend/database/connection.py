# backend/database/connection.py
import os
from pymongo import MongoClient, ASCENDING, DESCENDING
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "gitaverse")

class Database:
    client = None
    db = None

    @classmethod
    def connect_db(cls):
        try:
            cls.client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
            cls.client.admin.command('ping')
            cls.db = cls.client[DB_NAME]
            
            # PART 11: Create Indexes on user_id and compound index (user_id + created_at)
            cls.db.chat_history.create_index([("user_id", ASCENDING)])
            cls.db.chat_history.create_index([("user_id", ASCENDING), ("created_at", DESCENDING)])
            
            print(f"Successfully connected to MongoDB: {DB_NAME} (Indexes verified)")
            return cls.db
        except ConnectionFailure as e:
            print(f"Failed to connect to MongoDB at {MONGODB_URI}: {e}")
            raise e

def get_db():
    if Database.db is None:
        return Database.connect_db()
    return Database.db