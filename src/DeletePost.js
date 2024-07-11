import { Check, X } from "lucide-react";

const DeletePost = ({ selectedPost, closeDelete, closeModal, deletePost }) => {
  return (
    <div className="modal modal--delete animate__animated animate__fadeIn">
      {selectedPost && (
        <>
          <h2 className="title title--delete">Are you sure?</h2>

          <div className="modal-buttons modal-buttons--delete">
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
