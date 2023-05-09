import React from "react";
import DialogSkeleton from "./DialogSkeleton";

const DialogSkeletonList = () => {
  return (
    <>
      {[...Array(3)].map((item) => (
        <DialogSkeleton />
      ))}
    </>
  );
};

export default DialogSkeletonList;
