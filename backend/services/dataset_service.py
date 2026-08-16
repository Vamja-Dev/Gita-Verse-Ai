import json
import os

class DatasetService:
    def __init__(self):
        self.dataset_path = os.path.join(os.path.dirname(__file__), '../data/gita_dataset.json')
        self.records = []
        self.load_dataset()

    def load_dataset(self):
        if os.path.exists(self.dataset_path):
            with open(self.dataset_path, 'r', encoding='utf-8') as f:
                raw_data = json.load(f)
                self.records = self._normalize(raw_data)

    def _normalize(self, raw_data):
        normalized = []
        # Handles structure where chapters are keys (e.g., "1": [...])
        for chapter_num, verses in raw_data.items():
            for v in verses:
                shloka_num = v.get('shloka_number')
                record_id = f"{chapter_num}-{shloka_num}"
                
                normalized.append({
                    "id": record_id,
                    "chapter": int(chapter_num),
                    "shloka_number": int(shloka_num),
                    "sanskrit": v.get('sanskrit', ''),
                    "transliteration": v.get('transliteration', ''),
                    "translations": v.get('translations', {}),
                    "explanations": v.get('explanations', {}),
                    "real_life_example": v.get('real_life_example', {})
                })
        return normalized

    def get_all_records(self):
        return self.records