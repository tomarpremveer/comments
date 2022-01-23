import { useEffect, useState } from "react";
import "./App.css";
import CommentViewer from "./Components/CommentViewer";
import PostComment from "./Components/PostComment";
import {
  submitComment,
  getComments,
  getReplies,
} from "./utils/LocalstorageUtil";

function App() {
  const [allComments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  useEffect(() => {
    setComments(getComments);
    setReplies(getReplies);
  }, []);

  const onCommentSubmit = (obj) => {
    setComments((comments) => comments.concat([obj]));
    submitComment(obj);
  };
  return (
    <div>
      <PostComment onCommentSubmit={onCommentSubmit} />
      <CommentViewer
        replies={replies}
        comments={allComments}
        setComments={setComments}
      />
    </div>
  );
}

export default App;
