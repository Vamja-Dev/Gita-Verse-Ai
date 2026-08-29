# backend/middleware/auth_middleware.py
from fastapi import HTTPException, Header

def verify_admin(x_admin_auth: str = Header(None)):
    """Dependency to verify admin requests from frontend headers"""
    # Verifies the custom admin header passed from the React admin panel
    if x_admin_auth != "true":
        raise HTTPException(
            status_code=403, 
            detail="Forbidden: Administrative privileges required."
        )
    return True