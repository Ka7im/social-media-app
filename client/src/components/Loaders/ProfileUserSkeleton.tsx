import React from "react";
import ContentLoader from "react-content-loader";

const ProfileUserSkeleton = () => (
  <ContentLoader
    speed={2}
    width={450}
    height={150}
    viewBox="0 0 450 150"
    backgroundColor="#424242"
    foregroundColor="#ecebeb"
  >
    <circle cx="75" cy="75" r="75" />
    <rect x="170" y="65" rx="10" ry="10" width="233" height="20" />
    <rect x="170" y="114" rx="6" ry="6" width="100" height="15" />
  </ContentLoader>
);

export default ProfileUserSkeleton;
