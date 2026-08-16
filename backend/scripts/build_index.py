import os
import json
import faiss
import numpy as np
import sys

# Add backend directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from services.dataset_service import DatasetService
from services.embedding_service import EmbeddingService

def build_faiss_index():
    print("Initializing Dataset Service...")
    dataset_service = DatasetService()
    records = dataset_service.get_all_records()

    if not records:
        print("Error: No records found in dataset!")
        return

    print(f"Loaded {len(records)} shlokas. Preparing documents for embedding...")

    documents = []
    metadata = []

    for rec in records:
        # Construct a meaning-rich document for semantic retrieval
        doc_text = (
            f"Chapter {rec['chapter']}, Shloka {rec['shloka_number']}. "
            f"Sanskrit: {rec['sanskrit']} "
            f"Translation: {rec['translations'].get('english', '')} "
            f"Explanation: {rec['explanations'].get('english', '')} "
            f"Real life application: {rec['real_life_example'].get('english', '')}"
        )
        documents.append(doc_text)
        metadata.append({
            "id": rec['id'],
            "chapter": rec['chapter'],
            "shloka_number": rec['shloka_number']
        })

    print("Initializing Embedding Service...")
    embedding_service = EmbeddingService()

    print("Generating embeddings for all shlokas (this may take a minute)...")
    embeddings = embedding_service.embed_documents(documents)
    embeddings_np = np.array(embeddings).astype('float32')

    dimension = embeddings_np.shape[1]
    print(f"Embedding dimension: {dimension}. Building FAISS index...")

    # Using FAISS Flat L2 Index for exact semantic similarity search
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings_np)

    # Ensure vector_store directory exists
    store_dir = os.path.join(os.path.dirname(__file__), '../vector_store')
    os.makedirs(store_dir, exist_ok=True)

    index_path = os.path.join(store_dir, 'index.faiss')
    metadata_path = os.path.join(store_dir, 'metadata.json')

    faiss.write_index(index, index_path)
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)

    print(f"Success! FAISS index saved to {index_path}")
    print(f"Metadata saved to {metadata_path}")
    print(f"Total indexed shlokas: {index.ntotal}")

if __name__ == '__main__':
    build_faiss_index()