# backend/database/connection.py
import os
from pymongo import MongoClient
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
            print(f"Successfully connected to MongoDB: {DB_NAME}")
            return cls.db
        except ConnectionFailure as e:
            print(f"Failed to connect to MongoDB at {MONGODB_URI}: {e}")
            raise e

def get_db():
    if Database.db is None:
        return Database.connect_db()
    return Database.db