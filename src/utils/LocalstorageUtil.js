export function getComments() {
  return JSON.parse(localStorage.getItem("comments")) || [];
}

export function submitComment(comment) {
  //get all the items from the local storage and insert the newcomment and then save
  const comments = getComments();
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));
}

export function deleteComment(commentId) {
  const comments = getComments();
  const filteredComments = comments.filter(
    (comment) => comment.id !== commentId
  );
  localStorage.setItem("comments", JSON.stringify(filteredComments));
  //also need to take care of the case of replies deletion on deletion of the comment
  const replies = getReplies();
  if (replies[commentId] !== undefined) {
    delete replies[commentId];
    submitReply(replies);
  }
}

export function getReplies() {
  const replies = JSON.parse(localStorage.getItem("replies")) || {};
  return replies;
}

export function submitReply(replies) {
  localStorage.setItem("replies", JSON.stringify(replies));
}

export function deleteReply(replyId) {
  const replies = getReplies();
  const filteredReplies = replies.filter((reply) => reply.id !== replyId);
  localStorage.setItem("comments", JSON.stringify(filteredReplies));
}
