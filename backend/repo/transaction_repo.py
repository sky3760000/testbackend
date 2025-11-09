from sqlalchemy.orm import Session
from database import Transaction
from datetime import datetime
from typing import Optional

class TransactionRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_transaction(self, transaction_id: str) -> Optional[Transaction]:
        return self.db.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()
    
    def create_transaction(self, transaction_data: dict) -> Transaction:
        transaction = Transaction(**transaction_data)
        self.db.add(transaction)
        self.db.commit()
        self.db.refresh(transaction)
        return transaction
    
    def update_transaction_status(self, transaction_id: str, status: str, processed_at: datetime = None):
        transaction = self.get_transaction(transaction_id)
        if transaction:
            transaction.status = status
            if processed_at:
                transaction.processed_at = processed_at
            self.db.commit()
            self.db.refresh(transaction)
        return transaction
    
    def transaction_exists(self, transaction_id: str) -> bool:
        return self.db.query(Transaction).filter(Transaction.transaction_id == transaction_id).first() is not None
