import React from "react";
import ContentLoader from "react-content-loader";

const CommentSkeleton = () => (
  <ContentLoader
    speed={2}
    width={250}
    height={110}
    viewBox="0 0 250 110"
    backgroundColor="#424242"
    foregroundColor="#ecebeb"
  >
    <circle cx="32" cy="33" r="28" />
    <rect x="83" y="29" rx="10" ry="10" width="170" height="15" />
    <rect x="85" y="77" rx="10" ry="10" width="105" height="14" />
  </ContentLoader>
);

export default CommentSkeleton;
