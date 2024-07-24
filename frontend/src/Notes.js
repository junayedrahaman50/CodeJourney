import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateNote from "./CreateNote";
import NoteDetails from "./NoteDetails";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";

const Notes = () => {
  const { id } = useParams();
  const {
    data: post,
    error,
    isPending,
    setData,
  } = useFetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${id}`);

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [createNewNote, setCreateNewNote] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showEditNote, setShowEditNote] = useState(false);
  const [noteDetails, setNoteDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const initNewNote = () => {
    setCreateNewNote(true);
    setShowOverlay(true);
  };

  const initEdit = () => {
    setShowEditNote(true);
    setNoteDetails(false);
  };

  const initDelete = () => {
    setNoteDetails(false);
    setShowDelete(true);
  };

  const closeDelete = () => {
    setNoteDetails(true);
    setShowDelete(false);
  };

  const handleModal = (note) => {
    setSelectedNote(note);
    setShowOverlay(true);
    setNoteDetails(true);
  };

  const closeModal = () => {
    setCreateNewNote(false);
    setShowOverlay(false);
    setIsValid(true);
    setSelectedNote(null);
    setShowEditNote(false);
    setNoteDetails(false);
    setShowDelete(false);
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
          <h1 className="heading-primary heading-primary--note ">
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
          onClick={closeModal}
          className="overlay animate__animated animate__fadeIn"
        ></div>
      )}

      {noteDetails && (
        <NoteDetails
          selectedNote={selectedNote}
          closeModal={closeModal}
          initEdit={initEdit}
          initDelete={initDelete}
          renderContent={renderContent}
        />
      )}

      {showEditNote && (
        <EditNote
          selectedNote={selectedNote}
          closeModal={closeModal}
          post={post}
          setData={setData}
        />
      )}

      {showDelete && (
        <DeleteNote
          closeDelete={closeDelete}
          selectedNote={selectedNote}
          post={post}
          closeModal={closeModal}
          setData={setData}
        />
      )}

      {createNewNote && (
        <CreateNote
          newNoteTitle={newNoteTitle}
          setNewNoteTitle={setNewNoteTitle}
          newNoteContent={newNoteContent}
          setNewNoteContent={setNewNoteContent}
          setData={setData}
          closeModal={closeModal}
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
          post.notes.map((note) => (
            <div
              className="card mt-md"
              key={note.id}
              onClick={() => handleModal(note)}
            >
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
