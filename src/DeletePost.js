import { Check, X } from "lucide-react";

const DeletePost = ({ selectedPost, closeDelete, closeModal, deletePost }) => {
  return (
    <div className="modal animate__animated animate__fadeIn">
      {selectedPost && (
        <>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>

          <h2
            className="title"
            style={{
              textAlign: "center",
              fontWeight: "var(--SEMI_BOLD)",
              margin: "1rem 0",
            }}
          >
            Are you sure?
          </h2>

          <div
            className="modal-buttons"
            style={{ justifyContent: "center", gap: "0.8rem" }}
          >
            <button
              onClick={deletePost}
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

export default DeletePost;
