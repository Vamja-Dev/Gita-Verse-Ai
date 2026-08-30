# backend/seed_maps.py
from database.connection import get_db

def seed_maps():
    db = get_db()
    
    maps_data = [
        {
            "id": 1,
            "name": "The Sacred Geography of Kurukshetra",
            "title": "The Sacred Geography of Kurukshetra",
            "subtitle": "Historical Storytelling • Kurukshetra Map",
            "theme": "Sacred Geography & Overview",
            "summary": "Explore the complete sacred geography of Kurukshetra through its ancient sites, pilgrimage routes and historical landmarks.",
            "description": "Explore the complete sacred geography of Kurukshetra through its ancient sites, pilgrimage routes and historical landmarks.",
            "highlights": [
                "Comprehensive overview of Kurukshetra's sacred landscape",
                "Ancient pilgrimage routes and historical landmarks",
                "Mapping the holy land of the Bhagavad Gita"
            ],
            "keyPoints": [
                "Comprehensive overview of Kurukshetra's sacred landscape",
                "Ancient pilgrimage routes and historical landmarks",
                "Mapping the holy land of the Bhagavad Gita"
            ],
            "fullDetails": [
                "Explore the complete sacred geography of Kurukshetra through its ancient sites, pilgrimage routes and historical landmarks."
            ],
            "spiritualSignificance": "The eternal field of righteousness (Dharmakshetra) where material duty meets supreme spiritual awakening.",
            "image": "/uploads/main-map.png"
        },
        {
            "id": 2,
            "name": "Kurukshetra — The Sacred Land",
            "title": "Kurukshetra — The Sacred Land",
            "subtitle": "HISTORICAL REGION",
            "theme": "Historical Region & Kingdoms",
            "summary": "This inset map represents the geography of the major kingdoms involved in the events leading up to the Mahabharata War, including Kuru, Panchal, Matsya, and neighbouring regions.",
            "description": "This inset map represents the geography of the major kingdoms involved in the events leading up to the Mahabharata War, including Kuru, Panchal, Matsya, and neighbouring regions. It reflects the political landscape of the time, where diplomacy and alliances shaped the course of history. The map also references Viratnagar in the Matsya kingdom, associated with the crucial discussions between Yudhishthira and Sri Krishna, including the proposal of five villages to the Pandavas in a final effort to avert the great war.",
            "highlights": [
                "Ancient Kuru region",
                "Kurukshetra",
                "Hastinapur",
                "Indraprastha",
                "Mathura"
            ],
            "keyPoints": [
                "Ancient Kuru region",
                "Kurukshetra",
                "Hastinapur",
                "Indraprastha",
                "Mathura"
            ],
            "fullDetails": [
                "This inset map represents the geography of the major kingdoms involved in the events leading up to the Mahabharata War, including Kuru, Panchal, Matsya, and neighbouring regions. It reflects the political landscape of the time, where diplomacy and alliances shaped the course of history. The map also references Viratnagar in the Matsya kingdom, associated with the crucial discussions between Yudhishthira and Sri Krishna, including the proposal of five villages to the Pandavas in a final effort to avert the great war."
            ],
            "spiritualSignificance": "Reflects the political and ethical landscape of ancient Bharatavarsha where diplomacy preceded fateful choices.",
            "image": "/uploads/kuru-map.png"
        },
        {
            "id": 3,
            "name": "48 Kos Kurukshetra Parikrama",
            "title": "48 Kos Kurukshetra Parikrama",
            "subtitle": "PILGRIMAGE JOURNEY",
            "theme": "Parikrama Marg & Tirthas",
            "summary": "The 48 Kos Kurukshetra region represents the sacred pilgrimage landscape surrounding Kurukshetra, identifying numerous pilgrimage sites, sacred ponds, and historical locations.",
            "description": "The 48 Kos Kurukshetra region represents the sacred pilgrimage landscape surrounding Kurukshetra. The map traces the Parikrama Marg and identifies numerous pilgrimage sites, sacred ponds, villages and historical locations along the route.",
            "highlights": [
                "48 Kos Kurukshetra",
                "Parikrama Marg",
                "Pilgrimage sites",
                "Sacred ponds",
                "Historical locations"
            ],
            "keyPoints": [
                "48 Kos Kurukshetra",
                "Parikrama Marg",
                "Pilgrimage sites",
                "Sacred ponds",
                "Historical locations"
            ],
            "fullDetails": [
                "The 48 Kos Kurukshetra region represents the sacred pilgrimage landscape surrounding Kurukshetra. The map traces the Parikrama Marg and identifies numerous pilgrimage sites, sacred ponds, villages and historical locations along the route."
            ],
            "spiritualSignificance": "Walking the Parikrama cleanses the seeker's consciousness through remembrance of the epic's sacred geography.",
            "image": "/uploads/kuru-48kros.png"
        },
        {
            "id": 4,
            "name": "Jyotisar — The Battlefield of Dharma",
            "title": "Jyotisar — The Battlefield of Dharma",
            "subtitle": "BHAGAVAD GITA • JYOTISAR",
            "theme": "The Birthplace of the Bhagavad Gita",
            "summary": "Jyotisar is the sacred land where Sri Krishna delivered the message of the Bhagavad Gita to Arjuna before the battle of the Mahabharata.",
            "description": "Jyotisar is the sacred land where Sri Krishna delivered the message of the Bhagavad Gita to Arjuna before the battle of the Mahabharata, and is one of the many significant sites depicted on this map of Kurukshetra.",
            "highlights": [
                "Jyotisar",
                "Bhagavad Gita",
                "Krishna and Arjuna",
                "Battle of Dharma",
                "Kurukshetra"
            ],
            "keyPoints": [
                "Jyotisar",
                "Bhagavad Gita",
                "Krishna and Arjuna",
                "Battle of Dharma",
                "Kurukshetra"
            ],
            "fullDetails": [
                "Jyotisar is the sacred land where Sri Krishna delivered the message of the Bhagavad Gita to Arjuna before the battle of the Mahabharata, and is one of the many significant sites depicted on this map of Kurukshetra."
            ],
            "spiritualSignificance": "The focal point of absolute spiritual enlightenment where the eternal dialogue of life dissolved human doubt.",
            "image": "/uploads/kuru-jyotisar.png"
        }
    ]

    db.map.delete_many({})
    db.map.insert_many(maps_data)
    print("✅ Maps seeded successfully into MongoDB collection 'map' matching exact component content!")

if __name__ == "__main__":
    seed_maps()