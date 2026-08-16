import os
import json
import faiss
import numpy as np
from services.embedding_service import EmbeddingService
from services.dataset_service import DatasetService

class RetrievalService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.dataset_service = DatasetService()
        
        store_dir = os.path.join(os.path.dirname(__file__), '../vector_store')
        self.index_path = os.path.join(store_dir, 'index.faiss')
        self.metadata_path = os.path.join(store_dir, 'metadata.json')
        
        self.index = None
        self.metadata = []
        self.load_vector_store()

    def load_vector_store(self):
        if os.path.exists(self.index_path) and os.path.exists(self.metadata_path):
            self.index = faiss.read_index(self.index_path)
            with open(self.metadata_path, 'r', encoding='utf-8') as f:
                self.metadata = json.load(f)
        else:
            print("Warning: FAISS index or metadata not found. Please run build_index.py")

    def retrieve(self, query: str, top_k: int = 10):
        if not self.index:
            return []

        query_embedding = self.embedding_service.embed_text(query)
        query_np = np.array([query_embedding]).astype('float32')

        distances, indices = self.index.search(query_np, min(top_k, self.index.ntotal))
        
        all_records = {rec['id']: rec for rec in self.dataset_service.get_all_records()}
        
        results = []
        for score, idx in zip(distances[0], indices[0]):
            if idx == -1:
                continue
            meta = self.metadata[idx]
            rec_id = meta['id']
            if rec_id in all_records:
                record = all_records[rec_id].copy()
                # Lower FAISS L2 distance means higher similarity; convert distance to a score heuristic or keep score
                record['score'] = float(score)
                results.append(record)
                
        return results