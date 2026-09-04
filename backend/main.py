# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from routes.chat import router as chat_router
from routes.shlokas import router as shlokas_router
from routes.chapters import router as chapters_router
from routes.auth_logger import router as auth_logger_router
from routes.admin_routes import router as admin_router
from routes.admin_media import router as admin_media_router
from routes.cms_routes import router as cms_router
from routes.chat_history import router as chat_history_router
from database.connection import get_db

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Connecting to local MongoDB instance...")
    try:
        get_db()
    except Exception as e:
        print(f"❌ [CRITICAL DB ERROR]: {e}")
        raise e
    
    print("🚀 [SERVER STARTUP] Running on MongoDB primary storage!")
    yield

app = FastAPI(title="GitaVerse AI Backend", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads folder to serve admin media files publicly
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Register all API routers under /api
app.include_router(chat_router, prefix="/api")
app.include_router(shlokas_router, prefix="/api")
app.include_router(chapters_router, prefix="/api")
app.include_router(auth_logger_router, prefix="/api")
app.include_router(admin_router, prefix="/api")
app.include_router(admin_media_router, prefix="/api")
app.include_router(cms_router, prefix="/api")
app.include_router(chat_history_router, prefix="/api")

# Admin Login Authentication Endpoint
class AdminLoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/admin/login")
def admin_login(creds: AdminLoginRequest):
    if creds.email.lower() == "admin@gitaverse.com" and creds.password == "admin123":
        print("Admin login success: Administrator authenticated successfully.")
        return {"status": "success", "message": "Admin authenticated"}
    raise HTTPException(status_code=401, detail="Invalid admin credentials")

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)