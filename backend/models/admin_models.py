# backend/models/admin_models.py
from pydantic import BaseModel
from typing import Optional, Dict

class ChapterModel(BaseModel):
    chapter_number: int
    name: str
    sanskrit_name: str
    description: str
    verse_count: int
    chapter_image: Optional[str] = ""

class ShlokaModel(BaseModel):
    chapter_number: int
    shloka_number: int
    sanskrit: str
    transliteration: str
    translations: Dict[str, str]
    explanations: Dict[str, str]
    real_life_example: Dict[str, Dict[str, str]]

class MediaModel(BaseModel):
    name: str
    filename: str
    category: str
    chapterNumber: Optional[int] = None
    url: str
    altText: Optional[str] = ""