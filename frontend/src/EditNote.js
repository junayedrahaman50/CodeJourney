import { useState } from "react";

const EditNote = ({ selectedNote, closeModal, post, setData }) => {
  const [noteData, setNoteData] = useState(selectedNote);
  const [isValid, setIsValid] = useState(true);
  const [titleCount, setTitleCount] = useState(noteData.title.length);
  const [contentCount, setContentCount] = useState(noteData.content.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    const isAnyFieldEmpty = !noteData.title.trim() || !noteData.content.trim();

    if (!isAnyFieldEmpty) {
      setIsLoading(true);

      // Find the index of the note we're editing
      const noteIndex = post.notes.findIndex(
        (note) => note.id === selectedNote.id
      );

      // Create a new array of notes with the updated note
      const updatedNotes = [...post.notes];
      updatedNotes[noteIndex] = noteData;

      // Fetch request to update the post with the edited note
      fetch(`/api/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: updatedNotes }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((updatedPost) => {
          setData(updatedPost);
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating note:", error);
          setIsValid(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsValid(false);
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setNoteData({ ...noteData, title: value });
    setTitleCount(value.length);
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    setNoteData({ ...noteData, content: value });
    setContentCount(value.length);
  };

  return (
    <div className="modal animate__animated animate__fadeIn">
      <button onClick={closeModal} className="close-modal">
        &times;
      </button>
      <h2 className="title">Edit note</h2>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          className="post-input post-input--title"
          placeholder="Title"
          value={noteData.title}
          maxLength={100}
          onChange={handleTitleChange}
          required
        />
        <div className="counter-container">
          <span className="character-counter">{`${titleCount}/100`}</span>
        </div>
        <textarea
          className="post-input post-input--description"
          placeholder="Description"
          value={noteData.content}
          onChange={handleContentChange}
          maxLength={300}
          required
        />
        <div className="counter-container">
          <span className="character-counter">{`${contentCount}/300`}</span>
        </div>
        {!isValid && (
          <p className="error-form">
            Note title and description can't be empty
          </p>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className="btn-primary btn-primary--md"
        >
          {isLoading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditNote;
