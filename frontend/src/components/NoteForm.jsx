
import { useState } from "react";

function NoteForm({ onAddNote }) {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        try {
            setError("");

            await onAddNote({
                title: title,
                body: body
            });

            setTitle("");
            setBody("");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <h2>Add New Note</h2>

            <input
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Enter note description"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />

            {error && <p>{error}</p>}

            <button type="submit">
                Add Note
            </button>

        </form>
    );
}

export default NoteForm;
