import React from "react";
import { CommentWrapper } from "../Comment";
import CommentSkeleton from "./CommentSkeleton";

const CommentSkeletonList = () => {
  return (
    <>
      {[...Array(4)].map((item) => (
        <CommentWrapper>
          <CommentSkeleton />
        </CommentWrapper>
      ))}
    </>
  );
};

export default CommentSkeletonList;
