from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from repo.transaction_repo import TransactionRepository
import asyncio
from datetime import datetime

router = APIRouter()

class TransactionWebhook(BaseModel):
    transaction_id: str
    source_account: str
    destination_account: str
    amount: float
    currency: str

async def process_transaction(transaction_id: str, db: Session):
    await asyncio.sleep(30)
    repo = TransactionRepository(db)
    repo.update_transaction_status(transaction_id, "PROCESSED", datetime.utcnow())

@router.post("/transactions", status_code=202)
async def receive_webhook(
    webhook_data: TransactionWebhook,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    repo = TransactionRepository(db)
    
    if repo.transaction_exists(webhook_data.transaction_id):
        return {"message": "Transaction already processed"}
    
    transaction_data = {
        "transaction_id": webhook_data.transaction_id,
        "source_account": webhook_data.source_account,
        "destination_account": webhook_data.destination_account,
        "amount": webhook_data.amount,
        "currency": webhook_data.currency,
        "status": "PROCESSING"
    }
    
    repo.create_transaction(transaction_data)
    background_tasks.add_task(process_transaction, webhook_data.transaction_id, db)
    
    return {"message": "Transaction received"}
