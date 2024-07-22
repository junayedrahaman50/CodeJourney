import { useState } from "react";

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const CreateNote = ({
  newNoteContent,
  newNoteTitle,
  post,
  setData,
  setNewNoteContent,
  setNewNoteTitle,
  checkValid,
  setCreateNewNote,
  setShowOverlay,
  isValid,
  setIsValid,
  closeModal,
  id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [contentCount, setContentCount] = useState(0);

  const handleAddNote = (e) => {
    const isAnyFieldEmpty = !newNoteTitle.trim() || !newNoteContent.trim();
    if (!isAnyFieldEmpty) {
      e.preventDefault();
      const newNote = {
        id: generateUniqueId(), // Add a unique ID to the new note
        title: newNoteTitle,
        content: newNoteContent,
      };
      setIsLoading(true);

      fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes: [newNote, ...post.notes],
        }),
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          setData(updatedPost);
          setIsLoading(false);
          setNewNoteTitle("");
          setNewNoteContent("");
          setCreateNewNote(false);
          setShowOverlay(false);
          setIsValid(true);
        })
        .catch((error) => console.error("Error adding note:", error));
    } else {
      checkValid();
      return;
    }
  };

  const handleTitle = (e) => {
    const value = e.target.value;
    setNewNoteTitle(value);
    setTitleCount(value.length);
  };

  const handleContent = (e) => {
    const value = e.target.value;
    setNewNoteContent(value);
    setContentCount(value.length);
  };

  return (
    <>
      <div className="modal animate__animated animate__fadeIn">
        <button onClick={closeModal} className="close-modal">
          &times;
        </button>
        <h2 className="title">New note</h2>
        <form>
          <input
            type="text"
            className="post-input post-input--title"
            placeholder="Title"
            value={newNoteTitle}
            maxLength={100}
            onChange={handleTitle}
            required
          />
          <div className="counter-container">
            <span className="character-counter">{`${titleCount}/100`}</span>
          </div>
          <textarea
            className="post-input post-input--description"
            placeholder="Content"
            value={newNoteContent}
            onChange={handleContent}
            maxLength={300}
            required
          />
          <div className="counter-container">
            <span className="character-counter">{`${contentCount}/300`}</span>
          </div>
          {!isValid && (
            <p className="error-form">Notes title and content can't be empty</p>
          )}
          <button
            disabled={isLoading}
            type="submit"
            onClick={handleAddNote}
            className="btn-primary btn-primary--md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNote;
