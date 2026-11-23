
import { useState, useEffect } from "react";

import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";

import {
    getNotes,
    createNote,
    deleteNote
} from "./services/api";

import "./App.css";

function App() {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load notes when the page opens
    useEffect(() => {

        const loadNotes = async () => {
            try {
                const data = await getNotes();
                setNotes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadNotes();

    }, []);

    // Add a new note
    const handleAddNote = async (note) => {
        try {
            const newNote = await createNote(note);

            setNotes((prevNotes) => [
                newNote,
                ...prevNotes
            ]);

        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Delete a note
    const handleDeleteNote = async (id) => {
        try {
            await deleteNote(id);

            setNotes((prevNotes) =>
                prevNotes.filter((note) => note.id !== id)
            );

        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return (
        <div className="app">

            <h1>My Notes Board</h1>

            <NoteForm onAddNote={handleAddNote} />

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <h2>Your Notes</h2>

            {loading ? (
                <p>Loading notes...</p>
            ) : notes.length === 0 ? (
                <p>No notes available. Add your first note!</p>
            ) : (
                <div className="notes-container">

                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onDeleteNote={handleDeleteNote}
                        />
                    ))}

                </div>
            )}

        </div>
    );
}

export default App;
