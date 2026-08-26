from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from routes.chat import router as chat_router
from routes.shlokas import router as shlokas_router  # <--- Import the new shlokas router

load_dotenv()

app = FastAPI(title="GitaVerse AI Backend", version="1.0.0")

# Setup CORS for Vite React development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")
app.include_router(shlokas_router, prefix="/api")  # <--- Mount the shlokas router under /api

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)