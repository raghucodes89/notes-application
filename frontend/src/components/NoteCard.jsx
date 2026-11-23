
function NoteCard({ note, onDeleteNote }) {

    const handleDelete = async () => {
        try {
            await onDeleteNote(note.id);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="note-card">

            <h3>{note.title}</h3>

            <p>{note.body}</p>

            <small>
                ID: {note.id}
            </small>

            <p>
                Created: {new Date(note.createdAt).toLocaleString()}
            </p>

            <button onClick={handleDelete}>
                Delete
            </button>

        </div>
    );
}

export default NoteCard;
