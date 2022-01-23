import { useState } from "react";
import { ID } from "../utils/CommentUtils";
import Input from "./Input";
import TextArea from "./Textarea";

export default function PostComment({ onCommentSubmit }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      id: ID(),
      name,
      comment,
      dateTime: new Date(),
    };
    onCommentSubmit(obj);
    setName("");
    setComment("");
  };
  return (
    <div className="App">
      {/* comment posting section */}
      <div className="formContainer">
        <div className="formContainerTitle">
          <h4>Comment</h4>
        </div>

        <form onSubmit={onSubmit}>
          <Input value={name} id="name" onChange={setName} placeholder="Name" />
          <TextArea
            value={comment}
            id="commentbox"
            onChange={setComment}
            placeholder="Comment"
          />
          <div className="buttonContainer">
            <button type="submit" className="commentPostButton">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
