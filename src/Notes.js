import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Plus } from "lucide-react";
const Notes = () => {
  const { id } = useParams();
  const {
    data: post,
    error,
    isPending,
  } = useFetch(`http://localhost:9000/posts/${id}`);
  return (
    <div className="container">
      {post && (
        <div className="header mt-lg">
          <h1 style={{ fontSize: "3rem" }} className="heading-primary">
            {post.title}
          </h1>
          <button className="btn-primary mt-md">
            <Plus />
            New note
          </button>
        </div>
      )}

      <div className="content">
        {error && <div className="error">{error}</div>}
        {isPending && <div className="loading">Loading...</div>}
        {post &&
          post.notes.map((note, index) => (
            <div className="card mt-lg" key={index}>
              <h2 style={{ fontSize: "2rem", fontWeight: "var(--SEMI-BOLD)" }}>
                {note.title}
              </h2>
              <p style={{ fontSize: "var(--font-size-medium)" }}>
                {note.content.substring(0, 100) + "..."}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notes;
