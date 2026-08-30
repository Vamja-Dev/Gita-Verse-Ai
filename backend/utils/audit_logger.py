# backend/utils/audit_logger.py
import os
from datetime import datetime

# Define path relative to the backend folder or exact absolute path
LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "admin-txt")
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE = os.path.join(LOG_DIR, "adminchange.txt")

def log_admin_change(action_type: str, target_id: str, before_data: dict, after_data: dict):
    """Appends structured before/after changes with dates and timestamps to adminchange.txt"""
    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    time_str = now.strftime("%H:%M:%S")

    log_entry = f"""------------------------------------
{date_str}
------------------------------------
Time   : {time_str}
Action : {action_type}
Target ID: {target_id}
BEFORE : {before_data}
AFTER  : {after_data}

"""
    # Append to the file without overwriting previous entries
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_entry)