# backend/syncSheet.py
import os
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection setup
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "gitaverse")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
users_collection = db["users_sheet_logs"]

# Use SheetDB API for instant, real-time live data (bypasses Google's CSV cache entirely)
SHEETDB_URL = "https://sheetdb.io/api/v1/x84p8m28inivm"

def sync_google_sheet():
    """Fetches live data instantly via SheetDB API, upserts by ID, and purges deleted rows by ID."""
    try:
        print("Fetching latest data via SheetDB API...")
        response = requests.get(SHEETDB_URL, timeout=10)
        response.raise_for_status()

        rows = response.json()
        if not isinstance(rows, list) or len(rows) == 0:
            print("Warning: No rows found from SheetDB.")
            return

        print(f"Processing {len(rows)} active rows from SheetDB...")

        sheet_ids = set()
        synced_count = 0

        for row in rows:
            # Clean keys and values
            cleaned_row = {str(k).strip(): (str(v).strip() if v is not None else "") for k, v in row.items() if k}
            
            # Find the ID key dynamically
            row_id = None
            for key in cleaned_row.keys():
                if key.lower() == 'id':
                    row_id = str(cleaned_row[key]).strip()
                    break
            
            if not row_id and cleaned_row:
                row_id = str(cleaned_row.get(list(cleaned_row.keys())[0])).strip()
            
            if not row_id or row_id == "":
                continue
                
            sheet_ids.add(row_id)
                
            # Upsert into MongoDB collection matching the exact ID
            users_collection.update_one(
                {"ID": row_id},
                {"$set": cleaned_row},
                upsert=True
            )
            synced_count += 1

        # TWO-WAY RECONCILIATION BY ID:
        # Remove any document from MongoDB whose ID is no longer present in SheetDB
        delete_result = users_collection.delete_many({
            "ID": {"$exists": True, "$nin": list(sheet_ids)},
            "Method": {"$ne": "Session Activity"}
        })

        print(f"Successfully synced {synced_count} active rows into MongoDB (`users_sheet_logs`)!")
        if delete_result.deleted_count > 0:
            print(f"🗑️ Cleaned up {delete_result.deleted_count} deleted rows from MongoDB based on ID mismatch.")
        else:
            print("Cleaned up 0 rows (IDs are fully synchronized).")

    except Exception as e:
        print(f"Error syncing SheetDB: {e}")

if __name__ == "__main__":
    sync_google_sheet()