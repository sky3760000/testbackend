from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from repo.transaction_repo import TransactionRepository

router = APIRouter()

@router.get("/{transaction_id}")
async def get_transaction_status(
    transaction_id: str,
    db: Session = Depends(get_db)
):
    repo = TransactionRepository(db)
    transaction = repo.get_transaction(transaction_id)
    
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    return {
        "transaction_id": transaction.transaction_id,
        "status": transaction.status,
        "processed_at": transaction.processed_at.isoformat() + "Z" if transaction.processed_at else None
    }
