import React from "react";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import SharePost from "./SharePost";
import DeletePost from "./DeletePost";
import Modal from "./Modal";

const Home = () => {
  const {
    data: posts,
    isPending,
    error,
  } = useFetch("http://localhost:9000/posts");
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);

  const handleClick = () => {
    // window.open("https://x.com/junayed_rahaman", "_blank");
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
    fetch(`http://localhost:9000/posts/${selectedPost.id}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
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

  return (
    <>
      <>
        {showModal && (
          <div
            onClick={closeModal}
            className="overlay animate__animated animate__fadeIn"
          ></div>
        )}
        {/* tomorrow make that following modal another component */}
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
          <EditPost selectedPost={selectedPost} closeModal={closeModal} />
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
          <h1 className="heading-primary">
            {/* Junayed's 100 Days of Code Journey */}
            Track your coding progress
          </h1>
          {/* <button className="btn-primary mt-md" onClick={handleClick}>
            Follow my journey on
            <Twitter />
          </button> */}
          <button className="btn-primary mt-md" onClick={handleClick}>
            <Plus />
            New post
          </button>
        </div>
        <div className="content">
          {error && <div className="error">{error}</div>}
          {isPending && <div className="loading">Loading...</div>}
          {posts &&
            posts
              .slice()
              .reverse()
              .map((post) => (
                <div
                  onClick={() => handleModal(post)}
                  className="card mt-md"
                  key={post.id}
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
      <CreatePost visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Home;
