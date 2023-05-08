import React from "react";
import { IUser } from "../../types/User";
import Friend from "../Friend/Friend";

type FriendsListProps = {
  friends: IUser[];
};

const FriendsList = ({ friends }: FriendsListProps) => {
  return (
    <>
      {friends.map((user) => (
        <Friend user={user} />
      ))}
    </>
  );
};

export default FriendsList;
