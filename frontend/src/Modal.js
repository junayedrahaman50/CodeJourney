import { Link } from "react-router-dom";
import { NotebookPen, Trash2, Notebook, Share2 } from "lucide-react";
const Modal = ({
  closeModal,
  selectedPost,
  initEdit,
  renderContent,
  initDelete,
  initShare,
}) => {
  return (
    <div className="modal animate__animated animate__fadeIn">
      {selectedPost && (
        <>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
          <h2 className="title">{selectedPost.title}</h2>
          <p className="description">
            {renderContent(selectedPost.description)}
          </p>
          <div className="modal-buttons">
            <button onClick={initEdit} className="btn-primary btn-primary--md">
              <NotebookPen /> Edit
            </button>
            <button
              onClick={initDelete}
              className="btn-primary btn-primary--md"
            >
              <Trash2 /> Delete
            </button>
            <Link
              style={{ textDecoration: "none" }}
              to={`/notes/${selectedPost._id}`}
              className="btn-primary btn-primary--md"
            >
              <Notebook /> Notes
            </Link>
            <button onClick={initShare} className="btn-primary btn-primary--md">
              <Share2 /> Share
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
