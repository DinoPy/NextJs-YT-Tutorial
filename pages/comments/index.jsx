import React, { useState } from "react";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  const submitComment = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment: inputComment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  const deleteComment = async (id) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  };

  return (
    <>
      <input
        type="text"
        value={inputComment}
        onChange={(e) => setInputComment(e.target.value)}
      />

      <button onClick={fetchComments}> Load Comments</button>
      <button onClick={submitComment}> Submit Commment </button>

      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.id}. {comment.text}{" "}
            <button onClick={() => deleteComment(comment.id)}> X </button>
          </div>
        );
      })}
    </>
  );
};

export default CommentsPage;
