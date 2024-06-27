// import { TwitterTweetEmbed } from "react-twitter-embed";
import { Twitter } from "lucide-react";
const Home = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="heading-primary">Junayed's 100 Days of Code Journey</h1>
        <button className="btn-primary mt-md">
          Follow my journey on
          <Twitter />
        </button>
      </div>
      <div className="content">
        <div className="card mt-lg">
          <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
            Day 1
          </h2>
          <p style={{ fontSize: "var(--font-size-medium)" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident,
            laboriosam.
          </p>
          {/* <TwitterTweetEmbed tweetId={"1805659724018598152"} /> */}
        </div>
        <div className="card mt-lg">
          <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
            Day 1
          </h2>
          <p style={{ fontSize: "var(--font-size-medium)" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident,
            laboriosam.
          </p>
        </div>
        <div className="card mt-md">
          <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
            Day 1
          </h2>
          <p style={{ fontSize: "var(--font-size-medium)" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident,
            laboriosam.
          </p>
        </div>
        <div className="card mt-md">
          <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
            Day 1
          </h2>
          <p style={{ fontSize: "var(--font-size-medium)" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident,
            laboriosam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
