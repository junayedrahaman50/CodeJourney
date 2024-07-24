import { useState } from "react";

const EditPost = ({ selectedPost, closeModal, setData }) => {
  const [postData, setPostData] = useState(selectedPost);
  const [isValid, setIsValid] = useState(true);
  const [titleCount, setTitleCount] = useState(postData.title.length);
  const [desCount, setDesCount] = useState(postData.description.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (e) => {
    const isAnyFieldEmpty =
      !postData.title.trim() || !postData.description.trim();

    if (!isAnyFieldEmpty) {
      e.preventDefault();

      setIsLoading(true);

      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postData._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData), // Send the updated postData object
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          console.log("Updated Post:", updatedPost);
          setData((prevData) => {
            console.log("Previous Data:", prevData);
            return prevData.map((post) =>
              post._id === updatedPost._id ? updatedPost : post
            );
          });
          setIsLoading(false);
          setIsValid(true);
          closeModal(); // Close the modal after updating the state
        })
        .catch((error) => {
          console.error("Error updating post:", error);
          setIsLoading(false);
        });
    } else {
      setIsValid(false);
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setPostData({ ...postData, title: value });
    setTitleCount(value.length);
  };

  const handleDesChange = (e) => {
    const value = e.target.value;
    setPostData({ ...postData, description: value });
    setDesCount(value.length);
  };

  return (
    <>
      <div className="modal animate__animated animate__fadeIn">
        <button onClick={closeModal} className="close-modal">
          &times;
        </button>
        <h2 className="title">Edit post</h2>
        <form>
          <input
            type="text"
            className="post-input post-input--title"
            placeholder="Title"
            value={postData.title}
            maxLength={100}
            onChange={handleTitleChange}
            required
          />
          <div className="counter-container">
            <span className="character-counter">{`${titleCount}/100`}</span>
          </div>
          <textarea
            className="post-input post-input--description"
            placeholder="Description"
            value={postData.description}
            onChange={handleDesChange}
            maxLength={300}
            required
          />
          <div className="counter-container">
            <span className="character-counter">{`${desCount}/300`}</span>
          </div>
          {!isValid && (
            <p className="error-form">
              Post title and description can't be empty
            </p>
          )}
          <button
            disabled={isLoading}
            type="submit"
            onClick={handleEdit}
            className="btn-primary btn-primary--md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPost;
