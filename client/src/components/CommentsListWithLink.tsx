import React from "react";
import { IComment } from "../types/Comment";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { IUser } from "../types/User";

type CommentsListProps = {
  comments: IComment[];
  user: IUser | null;
};

const CommentsList = ({ comments, user }: CommentsListProps) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <Link to={`../${comment.post}`} style={{ textDecoration: "none" }}>
            <Comment user={user} comment={comment.comment} />
          </Link>
        );
      })}
    </>
  );
};

export default CommentsList;
