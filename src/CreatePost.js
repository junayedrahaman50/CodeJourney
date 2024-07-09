import { useState } from "react";

const CreatePost = ({ visible, setVisible }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setdescriptionCount] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const handleSubmit = (e) => {
    const isAnyFieldEmpty = !title.trim() || !description.trim();
    if (!isAnyFieldEmpty) {
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
        window.location.reload();
      });
    } else {
      checkValid();
      return;
    }
  };

  const closeModal = () => {
    setVisible(false);
    setIsValid(true);
  };

  const handleTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
    setTitleCount(value.length);
  };

  const handleDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
    setdescriptionCount(value.length);
  };

  const checkValid = () => {
    if (description === "" || title === "") setIsValid(false);
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
          <form>
            <input
              type="text"
              className="post-input post-input--title"
              placeholder="Title"
              value={title}
              maxLength={100}
              onChange={handleTitle}
              required
            />
            <div className="counter-container">
              <span className="character-counter">{`${titleCount}/100`}</span>
            </div>
            <textarea
              className="post-input post-input--description"
              placeholder="Description"
              value={description}
              onChange={handleDescription}
              maxLength={300}
              required
            />
            <div className="counter-container">
              <span className="character-counter">{`${descriptionCount}/300`}</span>
            </div>
            {!isValid && (
              <p className="error-form">
                Post title and description can't be empty
              </p>
            )}
            <button
              disabled={isLoading}
              type="submit"
              onClick={handleSubmit}
              className="btn-primary btn-primary--submit"
            >
              Submit
            </button>
          </form>
        </div>
      </>
    )
  );
};

export default CreatePost;
