#!/bin/bash

# Backend Deployment Script for Render/Railway/Heroku

# Install dependencies
pip install -r requirements.txt

# Run migrations (create database)
python -c "from database import init_db; init_db()"

# Start the application
uvicorn main:app --host 0.0.0.0 --port $PORT
