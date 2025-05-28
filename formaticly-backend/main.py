from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()
submissions = []

class FormSubmission(BaseModel):
    name: str
    email: str
    message: str
    submittedAt: datetime

@app.post("/submissions")
def submit_form(sub: FormSubmission):
    submissions.append(sub)
    return {"status": "success"}

@app.get("/submissions", response_model=List[FormSubmission])
def get_submissions():
    return submissions