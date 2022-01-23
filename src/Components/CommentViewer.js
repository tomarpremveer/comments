import { useState } from "react";
import { ID, sortValues } from "../utils/CommentUtils";
import { deleteComment, submitReply } from "../utils/LocalstorageUtil";
import Input from "./Input";
import TextArea from "./Textarea";

export default function CommentViewer({ comments = [], setComments }) {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [sortDirection, setSortDirection] = useState(0);
  const [replyComment, setReplyComment] = useState(null);
  const [replies, setReplies] = useState({});
  const onSortButtonClick = () => {
    const sortedComments = sortValues(comments, sortDirection);
    const updateSortOrder = sortDirection === 1 ? 0 : 1;
    setComments(sortedComments);
    setSortDirection(updateSortOrder);
  };

  const onCommentDelete = (commentId) => {
    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    deleteComment(commentId); // this is used for deleting comments from localstorage
    setComments(filteredComments);
  };

  const onReplyClick = (commentId) => {
    const id = replyComment ? null : commentId;
    setReplyComment(id);
  };
  const addReply = (commentId, replyObject) => {
    const updatedReplies = { ...replies };
    if (updatedReplies[[commentId]]) {
      updatedReplies[[commentId]] = [
        ...updatedReplies[[commentId]],
        replyObject,
      ];
    } else {
      updatedReplies[[commentId]] = [replyObject];
    }

    submitReply(updatedReplies);
    setReplies(updatedReplies);
  };
  const onSubmit = (commentId) => {
    console.log("commentId", commentId);
    const obj = {
      id: ID(),
      name,
      commentText,
      dateTime: new Date(),
    };
    addReply(commentId, obj);
    setName("");
    setCommentText("");
    const id = replyComment ? null : commentId;
    setReplyComment(id);
  };
  const arrow = sortDirection === 1 ? 2193 : 2191;
  return (
    <div className="commentViewer">
      <div className="sortbuttonContainer">
        <button onClick={onSortButtonClick}>
          Sort by date and time {String.fromCodePoint(parseInt(arrow, 16))}
        </button>
      </div>
      <div>
        {comments.length > 0
          ? comments.map((comment, index) => (
              <div key={comment.id}>
                <div className="commentContainer">
                  <div className="commentHeader">
                    <p style={{ margin: "2px 2px" }}>Name is {comment.name}</p>
                    <p style={{ margin: "2px 2px" }}>
                      {new Date(comment.dateTime).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="main">
                    <p className="comment"> {comment.comment}</p>
                    <button
                      className="deleteButton"
                      onClick={() => onCommentDelete(comment.id)}
                    >
                      D
                    </button>
                  </div>
                  <div className="commentButtonContainer">
                    <button onClick={() => onReplyClick(comment.id)}>
                      Reply
                    </button>
                    <button>Edit</button>
                  </div>
                </div>
                {comment.id === replyComment ? (
                  <div className="replyformContainer">
                    <div className="formContainerTitle">
                      <h4>Reply</h4>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(comment.id);
                      }}
                    >
                      <Input
                        value={name}
                        id="name"
                        onChange={setName}
                        placeholder="Name"
                      />
                      <TextArea
                        value={commentText}
                        id="commentbox"
                        onChange={setCommentText}
                        placeholder="Comment"
                      />
                      <div className="buttonContainer">
                        <button type="submit" className="commentPostButton">
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                ) : null}
                {replies[[comment.id]] !== undefined
                  ? replies[[comment.id]].map((reply) => (
                      <div key={reply.id}>
                        <div className="replyContainer">
                          <div className="commentHeader">
                            <p style={{ margin: "2px 2px" }}>
                              Name is {reply.name}
                            </p>
                            <p style={{ margin: "2px 2px" }}>
                              {new Date(reply.dateTime).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="main">
                            <p className="comment"> {reply.commentText}</p>
                            <button
                              className="deleteButton"
                              onClick={() => onCommentDelete(reply.id)}
                            >
                              D
                            </button>
                          </div>
                          <div className="commentButtonContainer">
                            <button>Edit</button>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
