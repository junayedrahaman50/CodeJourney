import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import useFetch from "./useFetch";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import SharePost from "./SharePost";
import DeletePost from "./DeletePost";
import Modal from "./Modal";

const Home = ({ userProfile }) => {
  const {
    data: posts,
    isPending,
    error,
    setData,
  } = useFetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts`);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
    setShowPostDetails(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowShare(false);
    setShowEdit(false);
    setShowDelete(false);
    setShowPostDetails(false);
    setSelectedPost(null);
  };

  const initDelete = () => {
    setShowPostDetails(false);
    setShowDelete(true);
  };

  const initShare = () => {
    setShowShare(true);
    setShowPostDetails(false);
  };

  const initEdit = () => {
    setShowEdit(true);
    setShowPostDetails(false);
  };

  const closeDelete = () => {
    setShowPostDetails(true);
    setShowDelete(false);
  };

  const handleDelete = () => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/posts/${selectedPost._id}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      setData((prevData) =>
        prevData.filter((post) => post._id !== selectedPost._id)
      ); // Update the state to remove the deleted post
      closeModal();
    });
  };

  const deletePost = () => {
    setShowDelete(false);
    setShowModal(false);
    handleDelete();
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Function to render content with line breaks
  const renderContent = (description) => {
    return description.split("\n").map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));
  };

  // Filter posts by userId
  const filteredPosts = posts?.filter(
    (post) => post.userId === userProfile.userId
  );

  return (
    <>
      <>
        {showModal && (
          <div
            onClick={closeModal}
            className="overlay animate__animated animate__fadeIn"
          ></div>
        )}
        {showPostDetails && (
          <Modal
            selectedPost={selectedPost}
            closeModal={closeModal}
            initEdit={initEdit}
            renderContent={renderContent}
            initDelete={initDelete}
            initShare={initShare}
          />
        )}
        {showEdit && (
          <EditPost
            selectedPost={selectedPost}
            closeModal={closeModal}
            setData={setData}
          />
        )}

        {showShare && (
          <SharePost selectedPost={selectedPost} closeModal={closeModal} />
        )}
        {showDelete && (
          <DeletePost
            selectedPost={selectedPost}
            closeDelete={closeDelete}
            closeModal={closeModal}
            deletePost={deletePost}
          />
        )}
      </>

      <div className="container">
        <div className="header mt-lg">
          <h1 className="heading-primary">Track your coding progress</h1>
          <button className="btn-primary mt-md" onClick={handleClick}>
            <Plus />
            New post
          </button>
        </div>
        <div className="content">
          {error && <div className="error">{error}</div>}
          {isPending && <div className="loading">Loading...</div>}
          {filteredPosts &&
            filteredPosts.map((post) => (
              <div
                onClick={() => handleModal(post)}
                className="card mt-md"
                key={post._id}
              >
                <h2
                  style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}
                >
                  {post.title}
                </h2>
                <p style={{ fontSize: "var(--font-size-medium)" }}>
                  {post.description.length > 100
                    ? post.description.substring(0, 100) + "..."
                    : renderContent(post.description)}
                </p>
              </div>
            ))}
        </div>
      </div>
      <CreatePost
        visible={visible}
        setVisible={setVisible}
        setData={setData}
        userProfile={userProfile}
      />
    </>
  );
};

export default Home;
