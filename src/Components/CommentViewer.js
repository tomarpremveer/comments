import { useState, useEffect } from "react";
import { ID, sortReplies, sortValues } from "../utils/CommentUtils";
import {
  deleteCommentLocalstorage,
  deleteReplyLocalstorage,
  getReplies,
  saveRepliesLocalstorage,
} from "../utils/LocalstorageUtil";
import Input from "./Input";
import TextArea from "./Textarea";

export default function CommentViewer({ comments = [], setComments }) {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [sortDirection, setSortDirection] = useState(0);
  const [replyComment, setReplyComment] = useState(null);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    setReplies(getReplies());
  }, []);
  const onSortButtonClick = () => {
    const sortedComments = sortValues(comments, sortDirection);
    const sortedReplies = sortReplies(replies, sortDirection);
    const updateSortOrder = sortDirection === 1 ? 0 : 1;
    setComments(sortedComments);
    setReplies(sortedReplies);
    setSortDirection(updateSortOrder);
  };

  const onCommentDelete = (commentId) => {
    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    deleteCommentLocalstorage(commentId);
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

    saveRepliesLocalstorage(updatedReplies);
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
    /*Set values of form field once we submit comment */
    setName("");
    setCommentText("");
    const id = replyComment ? null : commentId;
    setReplyComment(id);
  };
  const onReplyDelete = (commentId, replyId) => {
    const allReplies = { ...replies };
    const commentReplies = allReplies[commentId];
    const filteredReplies = commentReplies.filter(
      (reply) => reply.id !== replyId
    );
    if (filteredReplies.length > 0) {
      allReplies[commentId] = filteredReplies;
    } else {
      delete allReplies[commentId];
    }
    setReplies(allReplies);
    deleteReplyLocalstorage(commentId, replyId);
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
                    {/*Form for adding replies to the comment */}
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
                {/* rendering replies for the comment */}
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
                              onClick={() =>
                                onReplyDelete(comment.id, reply.id)
                              }
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
