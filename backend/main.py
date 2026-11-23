from fastapi import FastAPI , HTTPException, Response, status, Request
from fastapi.middleware.cors import CORSMiddleware 
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from datetime import datetime
import os


app = FastAPI(title="Notes Board API")


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )

# Enable CORS for local and deployed frontend
frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Temporary in-memory storage
notes = []
next_id = 1

class NoteCreate(BaseModel):
    title:str
    body: str =""

@app.get("/")
def home():
    return {"message": "Notes Board API is working"}


# Get all notes
@app.get("/api/notes")
def get_notes():
    return sorted(
        notes,
        key=lambda note: note["id"],
        reverse=True
    )
# Get a single note by id
@app.get("/api/notes/{note_id}")
def get_note_by_id(note_id: int):

    for note in notes:
        if note["id"] == note_id:
            return note

    raise HTTPException(
        status_code=404,
        detail="Note not found"
    )        

# Post create a note
@app.post("/api/notes", status_code=status.HTTP_201_CREATED)    
def create_note(note: NoteCreate):
    global next_id

    if not note.title.strip():
        raise HTTPException(
            status_code=400,
            detail="Title is required"
        )

    new_note = {
        "id" : next_id,
        "title": note.title.strip(),
        "body": note.body,
        "createdAt": datetime.now().isoformat()
    }    

    notes.append(new_note)
    next_id += 1

    return new_note

# delete a note
@app.delete("/api/notes/{note_id}", status_code=204)
def delete_note(note_id: int):
    for note in notes:
        if note["id"] == note_id:
            notes.remove(note)
            return Response(status_code=204)

    raise HTTPException(
        status_code=404,
        detail="Note not found"
    )
