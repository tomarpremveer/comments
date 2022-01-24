import { useEffect, useState } from "react";
import "./App.css";
import CommentViewer from "./Components/CommentViewer";
import PostComment from "./Components/PostComment";
import { submitComment, getComments } from "./utils/LocalstorageUtil";

function App() {
  const [allComments, setComments] = useState([]);
  useEffect(() => {
    setComments(getComments());
  }, []);

  const onCommentSubmit = (obj) => {
    setComments((comments) => comments.concat([obj]));
    submitComment(obj);
  };
  return (
    <div>
      <PostComment onCommentSubmit={onCommentSubmit} />
      <CommentViewer comments={allComments} setComments={setComments} />
    </div>
  );
}

export default App;
