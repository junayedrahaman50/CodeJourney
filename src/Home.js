import React from "react";
import { Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: posts,
    isPending,
    error,
  } = useFetch("http://localhost:8000/posts");
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleClick = () => {
    window.open("https://x.com/junayed_rahaman", "_blank");
  };

  const handleModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
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
  const renderContent = (content) => {
    return content.split("\n").map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      {showModal && (
        <>
          <div onClick={closeModal} className="overlay"></div>
          <div className="modal">
            {selectedPost && (
              <>
                <h2>{selectedPost.Day}</h2>
                <p>{renderContent(selectedPost.Content)}</p>
              </>
            )}
          </div>
        </>
      )}
      <div className="container">
        <div className="header mt-lg">
          <h1 className="heading-primary">
            Junayed's 100 Days of Code Journey
          </h1>
          <button className="btn-primary mt-md" onClick={handleClick}>
            Follow my journey on
            <Twitter />
          </button>
        </div>
        <div className="content">
          {error && <div className="error">{error}</div>}
          {isPending && <div className="loading">Loading...</div>}
          {posts &&
            posts.map((post) => (
              <div
                onClick={() => handleModal(post)}
                className="card mt-lg"
                key={post.id}
              >
                <h2
                  style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}
                >
                  {post.Day}
                </h2>
                <p style={{ fontSize: "var(--font-size-medium)" }}>
                  {renderContent(post.Content)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
