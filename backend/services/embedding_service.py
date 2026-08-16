import os
from sentence_transformers import SentenceTransformer

class EmbeddingService:
    def __init__(self):
        # Using a lightweight, high-performance multilingual model
        self.model_name = 'all-MiniLM-L6-v2'
        print(f"Loading embedding model ({self.model_name})...")
        self.model = SentenceTransformer(self.model_name)

    def embed_text(self, text: str) -> list:
        embedding = self.model.encode(text, convert_to_tensor=False)
        return embedding.tolist()

    def embed_documents(self, texts: list) -> list:
        embeddings = self.model.encode(texts, convert_to_tensor=False, show_progress_bar=True)
        return embeddings.tolist()