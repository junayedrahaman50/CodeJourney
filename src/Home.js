// import { TwitterTweetEmbed } from "react-twitter-embed";
import { Twitter } from "lucide-react";
import { useState } from "react";
const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    window.open("https://x.com/junayed_rahaman", "_blank");
  };

  const handleModal = () => {
    setShowModal(true);
    document.documentElement.style.overflowY = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.documentElement.style.overflowY = "";
  };

  return (
    <>
      {showModal && (
        <>
          <div onClick={closeModal} className="overlay"></div>
          <div className="modal"></div>
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
          <div onClick={handleModal} className="card mt-lg">
            <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
              Day 1
            </h2>
            <p style={{ fontSize: "var(--font-size-medium)" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, laboriosam.
            </p>
            {/* <TwitterTweetEmbed tweetId={"1805659724018598152"} /> */}
          </div>
          <div className="card mt-lg">
            <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
              Day 2
            </h2>
            <p style={{ fontSize: "var(--font-size-medium)" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, laboriosam.
            </p>
          </div>
          <div className="card mt-md">
            <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
              Day 3
            </h2>
            <p style={{ fontSize: "var(--font-size-medium)" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, laboriosam.
            </p>
          </div>
          <div className="card mt-md">
            <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
              Day 4
            </h2>
            <p style={{ fontSize: "var(--font-size-medium)" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, laboriosam.
            </p>
          </div>
          <div className="card mt-md">
            <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
              Day 5
            </h2>
            <p style={{ fontSize: "var(--font-size-medium)" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, laboriosam.
            </p>
          </div>
          <div className="card mt-md">
            <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
              Day 6
            </h2>
            <p style={{ fontSize: "var(--font-size-medium)" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, laboriosam.
            </p>
          </div>
          <div className="card mt-md">
            <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
              Day 7
            </h2>
            <p style={{ fontSize: "var(--font-size-medium)" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, laboriosam.
            </p>
          </div>
          <div className="card mt-md">
            <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
              Day 8
            </h2>
            <p style={{ fontSize: "var(--font-size-medium)" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident, laboriosam.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
