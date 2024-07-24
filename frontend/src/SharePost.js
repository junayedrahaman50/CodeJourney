import React from "react";
import { Helmet } from "react-helmet-async";
import { Facebook, Linkedin, Twitter, Clipboard } from "lucide-react";
// import { toast } from "react-toastify";

const SharePost = ({ selectedPost, closeModal }) => {
  if (!selectedPost) return null;

  const { title, description } = selectedPost;
  const shareText = `${title}\n\n${description}`;

  const generateTwitterShareURL = (text) => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  };

  const generateLinkedinShareURL = (text) => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      "https://codejourney.vercel.app/"
    )}&summary=${encodeURIComponent(text)}`;
  };

  const generateFacebookShareURL = (text) => {
    return `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
      text
    )}&u=${encodeURIComponent("https://codejourney.vercel.app/")}`;
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareText).then(
      () => {
        alert("Text copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: " + err);
      }
    );
  };

  const handleShareClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="modal animate__animated animate__fadeIn">
      <Helmet>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
      <button onClick={closeModal} className="close-modal">
        &times;
      </button>
      <div
        style={{ textAlign: "center", fontSize: "4rem", margin: "2rem 0 1rem" }}
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
        receiving feedback. Plus, we're sure people will want to see what you've
        built! We've added some simple sharing options below.
      </div>
      <div className="modal-buttons modal-buttons--share">
        <button
          className="btn-primary btn-primary--md tweet"
          onClick={() => handleShareClick(generateTwitterShareURL(shareText))}
        >
          <Twitter />
        </button>
        <button
          disabled={true}
          className="btn-primary btn-primary--md linkedin"
          onClick={() => handleShareClick(generateLinkedinShareURL(shareText))}
        >
          <Linkedin />
        </button>
        <button
          disabled={true}
          className="btn-primary btn-primary--md facebook"
          onClick={() => handleShareClick(generateFacebookShareURL(shareText))}
        >
          <Facebook />
        </button>
        <button
          className="btn-primary btn-primary--md copy"
          onClick={handleCopyToClipboard}
        >
          <Clipboard />
        </button>
      </div>
    </div>
  );
};

export default SharePost;
