import { NotebookPen, Trash2 } from "lucide-react";
const NoteDetails = ({
  selectedNote,
  closeModal,
  initEdit,
  renderContent,
  initDelete,
}) => {
  return (
    <div className="modal animate__animated animate__fadeIn">
      {selectedNote && (
        <>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
          <h2 className="title">{selectedNote.title}</h2>
          <p className="description">{renderContent(selectedNote.content)}</p>
          <div
            style={{ justifyContent: "flex-start", gap: "2rem" }}
            className="modal-buttons"
          >
            <button onClick={initEdit} className="btn-primary btn-primary--md">
              <NotebookPen /> Edit
            </button>
            <button
              onClick={initDelete}
              className="btn-primary btn-primary--md"
            >
              <Trash2 /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteDetails;
