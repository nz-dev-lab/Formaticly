from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field
from typing import List
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Feedback(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    message: str = Field(..., min_length=5)
    submitted_at: datetime = Field(default_factory=datetime.utcnow)

# In-memory storage (for testing, replace with DB later)
submissions = []

@app.post("/submit-feedback")
async def submit_feedback(feedback: Feedback):
    submissions.append(feedback)
    return {"message": "Feedback received"}

@app.get("/submissions", response_model=List[Feedback])
async def get_submissions():
    return submissions
