steps:
    python -m venv venv

    venv\Scripts\activate

    source venv/bin/activate

    pip install -r requirements.txt

    uvicorn main:app --reload
sqllite:
    sqlite3 transactions.db 
    .tables
    .schema transactions   