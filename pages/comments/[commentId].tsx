import React from 'react'
import { comments } from "../../data/comments";

const Comment = ({ comment }: {comment: {id:string; text:string}}) => {
  return (
    <div>
      <h1>
        {" "}
        {comment.id} --- {comment.text}{" "}
      </h1>
    </div>
  );
};

export default Comment;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { commentId: "1" } },
      { params: { commentId: "2" } },
      { params: { commentId: "3" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { commentId } = context.params;

  const response = await fetch(
    `http://localhost:3000/api/comments/${commentId}`
  );
  const comment = await response.json();

  const com = comments.find((comment) => comment.id === parseInt(commentId));

  console.log(commentId);
  console.log(comment);

  ///////////////// RETURN ////////////////
  return {
    props: {
      comment: comment,
    },
  };
}



