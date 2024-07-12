import { Check, X } from "lucide-react";
const DeleteNote = ({
  selectedNote,
  closeDelete,
  post,
  closeModal,
  setData,
}) => {
  const handleDelete = () => {
    const filteredNotes = post.notes.filter(
      (note) => note.id !== selectedNote.id
    );
    console.log(filteredNotes);
    fetch(`http://localhost:9000/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: filteredNotes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((updatedNotes) => {
        setData(updatedNotes);
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };
  return (
    <div className="modal modal--delete animate__animated animate__fadeIn">
      {selectedNote && (
        <>
          <h2 className="title title--delete">Are you sure?</h2>

          <div className="modal-buttons modal-buttons--delete">
            <button
              onClick={handleDelete}
              className="btn-primary btn-primary--md"
            >
              <Check /> Yes
            </button>
            <button
              onClick={closeDelete}
              className="btn-primary btn-primary--md"
            >
              <X /> No
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteNote;
