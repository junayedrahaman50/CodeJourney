import { useState } from "react";

const CreatePost = ({ visible, setVisible }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, description };
    setIsLoading(true);

    fetch("http://localhost:9000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      setIsLoading(false);
      console.log("new post added!");
    });
  };

  const closeModal = () => {
    setVisible(false);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    // setTitleCount(value.length);
  };

  return (
    visible && (
      <>
        <div
          onClick={closeModal}
          className="overlay animate__animated animate__fadeIn"
        ></div>
        <div className="modal animate__animated animate__fadeIn">
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
          <h2 className="title">New Post</h2>
          <input
            type="text"
            className="post-input post-input--title"
            placeholder="Enter post title"
            value={title}
            maxLength={100}
            onChange={handleTitleChange}
            required
          />
        </div>
      </>
    )
  );
};

export default CreatePost;
