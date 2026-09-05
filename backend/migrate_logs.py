import os
import re
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB_NAME", "gitaverse")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
logs_collection = db["admin_activity_logs"]

LOG_FILE = os.path.join(os.path.dirname(__file__), "admin-txt", "adminchange.txt")

def migrate_text_logs():
    if not os.path.exists(LOG_FILE):
        print("❌ adminchange.txt not found!")
        return

    with open(LOG_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    blocks = content.split("------------------------------------")
    count = 0

    for i in range(1, len(blocks), 2):
        if i + 1 >= len(blocks):
            break
            
        date_str = blocks[i].strip()
        body = blocks[i+1].strip()

        if not body:
            continue

        # Extract Action, Target ID, Time, Before, and After using regex
        action_match = re.search(r"Action\s*[:]\s*(.*)", body)
        target_match = re.search(r"Target ID\s*[:]\s*(.*)", body)
        time_match = re.search(r"Time\s*[:]\s*([\d:]+)", body)
        before_match = re.search(r"BEFORE\s*[:]\s*(.*)", body)
        after_match = re.search(r"AFTER\s*[:]\s*(.*)", body)

        action = action_match.group(1).strip() if action_match else "UNKNOWN"
        target_id = target_match.group(1).strip() if target_match else "N/A"
        time_str = time_match.group(1).strip() if time_match else None

        # Combine Date and Time precisely
        try:
            if time_str:
                full_timestamp_str = f"{date_str} {time_str}"
                timestamp = datetime.strptime(full_timestamp_str, "%Y-%m-%d %H:%M:%S")
            else:
                timestamp = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            try:
                timestamp = datetime.strptime(date_str, "%Y-%m-%d")
            except ValueError:
                timestamp = datetime.utcnow()

        # Parse dictionary structures safely
        before_data = {}
        after_data = {}
        
        if before_match:
            try:
                before_data = eval(before_match.group(1).strip())
            except Exception:
                before_data = {"raw": before_match.group(1).strip()}

        if after_match:
            try:
                after_data = eval(after_match.group(1).strip())
            except Exception:
                after_data = {"raw": after_match.group(1).strip()}

        log_doc = {
            "email": "admin@gitaverse.com",
            "action": action,
            "target_id": target_id,
            "timestamp": timestamp,
            "status": "success",
            "changes": {
                "before": before_data,
                "after": after_data
            }
        }

        logs_collection.insert_one(log_doc)
        count += 1

    print(f"Successfully migrated {count} historical log entries with accurate timestamps into MongoDB!")

if __name__ == "__main__":
    migrate_text_logs()