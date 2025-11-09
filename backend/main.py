from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from database import init_db
from routers import webhook_router, transaction_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(webhook_router.router, prefix="/v1/webhooks")
app.include_router(transaction_router.router, prefix="/v1/transactions")

@app.get("/")
async def health_check():
    from datetime import datetime
    return {
        "status": "HEALTHY",
        "current_time": datetime.utcnow().isoformat() + "Z"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
