class RankingService:
    def rank_candidates(self, query: str, candidates: list):
        if not candidates:
            return None, []

        # Sort candidates by FAISS L2 distance score (lower is closer/better match)
        sorted_candidates = sorted(candidates, key=lambda x: x.get('score', float('inf')))

        # Primary best match
        primary = sorted_candidates[0]
        
        # Supporting alternative shlokas (next top matches)
        supporting = sorted_candidates[1:3] if len(sorted_candidates) > 1 else []

        return primary, supporting