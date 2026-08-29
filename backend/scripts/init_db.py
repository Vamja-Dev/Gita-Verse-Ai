# backend/scripts/init_db.py
import sys
import os
from pymongo.errors import OperationFailure

# Add parent directory to path so we can import database connection
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from database.connection import get_db

def init_database():
    db = get_db()
    
    # 1. Ensure collections exist
    collections = ["chapters", "shlokas", "media"]
    existing_collections = db.list_collection_names()
    
    for col in collections:
        if col not in existing_collections:
            db.create_collection(col)
            print(f"Created collection: {col}")
        else:
            print(f"Collection already exists: {col}")
            
    # 2. Create indexes for Shlokas (Chapter + Shloka number unique lookup)
    try:
        db.shlokas.create_index(
            [("chapter_number", 1), ("shloka_number", 1)],
            unique=True,
            name="idx_chapter_shloka_unique"
        )
        print("Created unique compound index on shlokas (chapter_number, shloka_number)")
    except OperationFailure as e:
        if e.code == 85:  # IndexOptionsConflict
            print("Index on shlokas already exists (safely skipped).")
        else:
            raise e

    # 3. Create index for Chapters
    try:
        db.chapters.create_index(
            [("chapter_number", 1)],
            unique=True,
            name="idx_chapter_number_unique"
        )
        print("Created unique index on chapters (chapter_number)")
    except OperationFailure as e:
        if e.code == 85:
            print("Index on chapters already exists (safely skipped).")
        else:
            raise e

    # 4. Create index for Media metadata search
    try:
        db.media.create_index(
            [("category", 1), ("chapterNumber", 1)],
            name="idx_media_category_chapter"
        )
        print("Created index on media (category, chapterNumber)")
    except OperationFailure as e:
        if e.code == 85:
            print("Index on media already exists (safely skipped).")
        else:
            raise e

    print("🚀 Database structure and indexes initialized successfully!")

if __name__ == "__main__":
    init_database()