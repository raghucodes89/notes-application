const API_URL = "/api/notes";

// get all notes
export async function getNotes() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to fetch notes");
  }
  return response.json();
}

// Get notes by id
export async function getNoteById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Notes not found");
  }
  return data;
}

// Post create note
export async function createNote(note) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create note");
  }
  return data;
}

// delete note
export async function deleteNote(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to delete note");
  }
}
