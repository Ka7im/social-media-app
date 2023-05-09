import React, { useEffect } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/redux-hook";
import { getFriendsSelector } from "../redux/slices/friendsSlice/selectors";
import { getFriends } from "../redux/slices/friendsSlice/friendsSlice";
import FriendsList from "../components/FriendsList/FriendsList";
import { Status } from "../redux/slices/postsSlice/postsSlice";
import SmallSpinner from "../components/Loaders/SmallSpinner";

const FriendsWrapper = styled.div`
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 20px;
  background-color: ${(props) => props.theme.colors.componentBg};
  color: ${(props) => props.theme.colors.font};
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const FriendsTitle = styled.h2`
  font-size: 17px;
  align-self: flex-start;
`;

const Friends = () => {
  const { friends, status } = useAppSelector(getFriendsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  return (
    <Layout>
      <FriendsWrapper>
        <FriendsTitle>Ваши друзья</FriendsTitle>
        {status === Status.Loading ? (
          <SmallSpinner />
        ) : (
          <>
            {friends.length === 0 ? (
              "К сожалению у вас еще нет друзей 😕"
            ) : (
              <FriendsList friends={friends} />
            )}
          </>
        )}
      </FriendsWrapper>
    </Layout>
  );
};

export default Friends;
