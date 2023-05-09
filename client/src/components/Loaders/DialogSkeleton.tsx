import React from "react";
import ContentLoader from "react-content-loader";

const DialogSkeleton = () => (
  <div style={{ padding: "10px" }}>
    <ContentLoader
      speed={2}
      width={250}
      height={50}
      viewBox="0 0 250 50"
      backgroundColor="#424242"
      foregroundColor="#ecebeb"
    >
      <circle cx="25" cy="25" r="25" />
      <rect x="65" y="17" rx="7" ry="7" width="170" height="16" />
    </ContentLoader>
  </div>
);

export default DialogSkeleton;
