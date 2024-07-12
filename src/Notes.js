import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateNote from "./CreateNote";

const Notes = () => {
  const { id } = useParams();
  const {
    data: post,
    error,
    isPending,
    setData,
  } = useFetch(`http://localhost:9000/posts/${id}`);

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [createNewNote, setCreateNewNote] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const initNewNote = () => {
    setCreateNewNote(true);
    setShowOverlay(true);
  };

  const closeNewNote = () => {
    setCreateNewNote(false);
    setShowOverlay(false);
    setIsValid(true);
  };
  const checkValid = () => {
    if (newNoteContent === "" || newNoteTitle === "") setIsValid(false);
  };

  // Function to render content with line breaks
  const renderContent = (description) => {
    return description.split("\n").map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="container">
      {post && (
        <div className="header mt-lg">
          <h1 style={{ fontSize: "3rem" }} className="heading-primary">
            {post.title}
          </h1>
          <button className="btn-primary mt-md" onClick={initNewNote}>
            <Plus />
            Add new note
          </button>
        </div>
      )}

      {showOverlay && (
        <div
          onClick={closeNewNote}
          className="overlay animate__animated animate__fadeIn"
        ></div>
      )}

      {createNewNote && (
        <CreateNote
          newNoteTitle={newNoteTitle}
          setNewNoteTitle={setNewNoteTitle}
          newNoteContent={newNoteContent}
          setNewNoteContent={setNewNoteContent}
          setData={setData}
          closeNewNote={closeNewNote}
          isValid={isValid}
          setIsValid={setIsValid}
          checkValid={checkValid}
          setCreateNewNote={setCreateNewNote}
          setShowOverlay={setShowOverlay}
          post={post}
          id={id}
        />
      )}
      <div className="content">
        {error && <div className="error">{error}</div>}
        {isPending && <div className="loading">Loading...</div>}
        {post &&
          post.notes.map((note, index) => (
            <div className="card mt-lg" key={index}>
              <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
                {note.title}
              </h2>
              <p style={{ fontSize: "var(--font-size-medium)" }}>
                {note.content.length > 100
                  ? note.content.substring(0, 100) + "..."
                  : renderContent(note.content)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notes;
