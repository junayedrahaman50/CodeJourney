import { Facebook, Linkedin, Twitter, Clipboard } from "lucide-react";

const SharePost = ({ selectedPost, setShowShare, renderContent }) => {
  return (
    <div className="modal animate__animated animate__fadeIn">
      {selectedPost && (
        <>
          <button onClick={() => setShowShare(false)} className="close-modal">
            &times;
          </button>
          <div
            style={{
              textAlign: "center",
              fontSize: "4rem",
              margin: "2rem 0 1rem",
            }}
          >
            🤩
          </div>
          <div
            className="text"
            style={{
              fontSize: "2.4rem",
              fontWeight: "var(--BOLD)",
              textAlign: "center",
              margin: "1rem 0 .4rem",
            }}
          >
            Share your progress
          </div>
          <div
            className="sub-text"
            style={{
              fontSize: "1.6rem",
              fontWeight: "var(--SEMI-BOLD)",
              color: "var(--primary-tint-color)",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Show off your hard work
          </div>
          <div
            className="sub-text-sm"
            style={{
              fontSize: "1.6rem",
              textAlign: "center",
              margin: "1rem 0 2rem",
              lineHeight: 1.5,
            }}
          >
            Sharing your coding journey with others can increase the chances of
            receiving feedback. Plus, we're sure people will want to see what
            you've built! We've added some simple sharing options below.
          </div>
          {/* <h2 className="title">{selectedPost.title}</h2> */}

          <div
            className="modal-buttons"
            style={{ justifyContent: "center", gap: "0.8rem" }}
          >
            <button className="btn-primary btn-primary--md">
              <Twitter /> Tweet
            </button>
            <button className="btn-primary btn-primary--md">
              <Linkedin /> Share
            </button>
            <button className="btn-primary btn-primary--md">
              <Facebook /> Share
            </button>
            <button className="btn-primary btn-primary--md">
              <Clipboard /> Copy
            </button>
          </div>
          {/* <p
            className="description"
            style={{ margin: "1rem 0", padding: "0 2rem" }}
          >
            {renderContent(selectedPost.description)}
          </p> */}
        </>
      )}
    </div>
  );
};

export default SharePost;
