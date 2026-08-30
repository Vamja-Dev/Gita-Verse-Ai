# backend/seed_home.py
from database.connection import get_db

def seed_home():
    db = get_db()
    
    home_sections_data = [
        {
            "id": 1,
            "sectionKey": "section_1",
            "title": "Chariot & Battlefield Guidance",
            "description": "The eternal dialogue on the plains of Kurukshetra.",
            "images": [
                "/uploads/artwork-1.jpg",
                "/uploads/artwork-1-1.jpg",
                "/uploads/artwork-1-2.jpg",
                "/uploads/artwork-1-3.jpg",
                "/uploads/artwork-1-4.jpg"
            ]
        },
        {
            "id": 2,
            "sectionKey": "section_2",
            "title": "Cosmic Universal Form (Virat Rupa)",
            "description": "The infinite expanse of time and creation.",
            "images": [
                "/uploads/artwork-2.jpg",
                "/uploads/artwork-2-1.jpg",
                "/uploads/artwork-2-2.jpg",
                "/uploads/artwork-2-3.jpg",
                "/uploads/artwork-2-4.jpg"
            ]
        },
        {
            "id": 3,
            "sectionKey": "section_3",
            "title": "Divine Flute & Serenity",
            "description": "The transcendental bliss of Supreme Consciousness.",
            "images": [
                "/uploads/artwork-3.jpg",
                "/uploads/artwork-3-1.jpg",
                "/uploads/artwork-3-2.jpg",
                "/uploads/artwork-3-3.jpg",
                "/uploads/artwork-3-4.jpg"
            ]
        }
    ]

    db.home.delete_many({})
    db.home.insert_many(home_sections_data)
    print("✅ Home sections successfully seeded into MongoDB collection 'home'!")

if __name__ == "__main__":
    seed_home()