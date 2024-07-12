import { useState } from "react";
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
  closeNewNote,
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
        title: newNoteTitle,
        content: newNoteContent,
      };
      setIsLoading(true);

      fetch(`http://localhost:9000/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes: [...post.notes, newNote],
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
      {/* <input
        type="text"
        value={newNoteTitle}
        onChange={(e) => setNewNoteTitle(e.target.value)}
        placeholder="New note title"
        className="post-input post-input--title mt-sm"
      />
      <textarea
        value={newNoteContent}
        onChange={(e) => setNewNoteContent(e.target.value)}
        placeholder="New note content"
        className="post-input post-input--description mt-sm"
      /> */}

      <div className="modal animate__animated animate__fadeIn">
        <button onClick={closeNewNote} className="close-modal">
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
