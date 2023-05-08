import React from "react";
import styled from "styled-components";
import { TiUserDeleteOutline } from "react-icons/ti";
import { IconContext } from "react-icons";
import { IUser } from "../../types/User";
import { Link } from "react-router-dom";
import { BASE_URL, PROFILE_PAGE } from "../../utils/consts";
import { useAppDispatch } from "../../redux/redux-hook";
import { deleteFriend } from "../../redux/slices/friendsSlice/friendsSlice";

const FriendWrapper = styled.div`
  display: flex;
  padding-bottom: 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const FriendAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

const FriendInfo = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
`;

const FriendName = styled.div`
  color: ${(props) => props.theme.colors.font};
  font-size: 15px;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  align-self: center;
  cursor: pointer;
`;

type FriendProps = {
  user: IUser;
};

const Friend = ({ user }: FriendProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteFriend(user._id));
  };

  return (
    <FriendWrapper>
      <FriendAvatar src={`${BASE_URL}${user.avatarUrl}`} />
      <FriendInfo>
        <Link
          to={PROFILE_PAGE + "/" + user._id}
          style={{
            alignSelf: "center",
            textDecorationColor: "white",
            height: "min-content",
          }}
        >
          <FriendName>{user.fullName}</FriendName>
        </Link>
        <IconWrapper onClick={handleDelete}>
          <IconContext.Provider value={{ color: "red", size: "20px" }}>
            <TiUserDeleteOutline />
          </IconContext.Provider>
        </IconWrapper>
      </FriendInfo>
    </FriendWrapper>
  );
};

export default Friend;
