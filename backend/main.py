# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
import threading
import time
from dotenv import load_dotenv
from routes.chat import router as chat_router
from routes.shlokas import router as shlokas_router
from routes.chapters import router as chapters_router
from routes.auth_logger import router as auth_logger_router
from syncSheet import sync_google_sheet

load_dotenv()

def background_sheet_sync_worker():
    """Background loop that automatically syncs Google Sheets to MongoDB every 30 seconds"""
    while True:
        try:
            sync_google_sheet()
        except Exception as e:
            print(f"❌ [AUTO-SYNC ERROR]: {e}")
        time.sleep(30)  # Checks and syncs every 30 seconds automatically

# Modern FastAPI Lifespan event handler with background auto-sync thread
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Running initial automatic Google Sheet sync...")
    try:
        sync_google_sheet()
    except Exception as e:
        print(f"Startup sync encountered an issue: {e}")
        
    # Start the background sync thread
    sync_thread = threading.Thread(target=background_sheet_sync_worker, daemon=True)
    sync_thread.start()
    print("🚀 [SERVER STARTUP] Background Google Sheet auto-sync worker started successfully!")
    
    yield

app = FastAPI(title="GitaVerse AI Backend", version="1.0.0", lifespan=lifespan)

# Setup CORS for Vite React development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")
app.include_router(shlokas_router, prefix="/api")
app.include_router(chapters_router, prefix="/api")
app.include_router(auth_logger_router, prefix="/api")

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)