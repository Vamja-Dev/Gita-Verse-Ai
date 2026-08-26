# backend/syncSheet.py
import os
import csv
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection setup
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "gitaverse")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
users_collection = db["users_sheet_logs"]  # Collection for your Google Sheet users

# Your published Google Sheet CSV URL
CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTm82H4FzGjQY-UCc57duV6XQAtWfToMDQ6JKcCEJOKK3hkjHLHNRZRj8J8HuBmnFnGCGgzQrBbw7WQ/pub?output=csv"

def sync_google_sheet():
    """Fetches live CSV data from Google Sheets and upserts into MongoDB, handling BOM and caching."""
    try:
        print("Fetching latest data from Google Sheet...")
        response = requests.get(CSV_URL, timeout=10)
        response.raise_for_status()

        # Parse CSV text data securely and strip hidden BOM characters like \ufeff
        decoded_content = response.content.decode('utf-8-sig')
        csv_reader = csv.DictReader(decoded_content.splitlines())
        
        rows = list(csv_reader)
        if not rows:
            print("Warning: No rows found in the sheet.")
            return

        print(f"Processing {len(rows)} raw rows from sheet...")

        synced_count = 0
        for row in rows:
            # Clean keys and values, removing invisible spaces and weird characters
            cleaned_row = {str(k).strip().replace('\ufeff', ''): (str(v).strip() if v is not None else "") for k, v in row.items() if k}
            
            # Find the ID key dynamically (handles 'id', 'ID', or the first column)
            row_id = None
            for key in cleaned_row.keys():
                if key.lower() == 'id':
                    row_id = cleaned_row[key]
                    break
            
            if not row_id and cleaned_row:
                row_id = cleaned_row.get(list(cleaned_row.keys())[0])
            
            # Skip rows where ID is missing or empty
            if not row_id or row_id == "":
                continue
                
            # Upsert into MongoDB collection matching the exact ID
            users_collection.update_one(
                {"ID": row_id},
                {"$set": cleaned_row},
                upsert=True
            )
            synced_count += 1

        print(f"Successfully synced {synced_count} active rows into MongoDB (`users_sheet_logs`)!")

    except Exception as e:
        print(f"Error syncing Google Sheet: {e}")

if __name__ == "__main__":
    sync_google_sheet()