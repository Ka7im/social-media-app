import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/redux-hook";
import {
  fetchRemovePost,
  fetchTags,
  like,
  unlike,
} from "../redux/slices/postsSlice/postsSlice";
import { IPost } from "../types/Post";
import { BASE_URL } from "../utils/consts";
import {
  getThemeSelector,
  getUserIdSelector,
} from "../redux/slices/authSlice/selectors";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import React from "react";
import { getPostLikesSelector } from "../redux/slices/postsSlice/selectors";

export const PostWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.componentBg};
  border-radius: 10px;
  padding: 20px;
  min-width: 100%;
  position: relative;
  color: ${(props) => props.theme.colors.font};
`;

const PostEditRemoveWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  position: absolute;
  cursor: pointer;
  top: 25px;
  right: 25px;
`;

const PostIconWrapper = styled.div`
  transition: 0.5s ease all;

  &:hover {
    transform: scale(1.2);
  }
`;

export const PostImg = styled.img`
  border-radius: 10px;
  width: 100%;
  max-height: 350px;
  margin-bottom: 15px;
  object-fit: cover;
`;

export const PostUserInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

export const AvatarInfo = styled.div`
  display: grid;
`;

export const UserName = styled.div`
  color: ${(props) => props.theme.mainColor};
  font-weight: 500;
`;

export const PostDate = styled.div`
  color: ${(props) => props.theme.colors.font};
  font-weight: 400;
  font-size: 13px;
`;

export const PostInfo = styled.div`
  display: grid;
  padding-left: 50px;
  row-gap: 15px;
`;

export const PostTitle = styled.h3`
  font-weight: 700;
  color: ${(props) => props.theme.colors.font};
  font-size: 23px;
`;

export const PostTag = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.colors.font};
`;

export const PostTagWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const IconsWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const IconWrapper = styled.div`
  display: flex;
  margin-right: 5px;
`;

export const IconInfo = styled.div`
  color: ${(props) => props.theme.colors.font};
  align-self: center;
`;

type PostProps = IPost & { isOwner: boolean };

export const Post = ({
  _id,
  tags,
  title,
  viewsCount,
  createdAt,
  imageUrl,
  user,
  isOwner,
}: PostProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getThemeSelector);
  const likes = useAppSelector((state) => getPostLikesSelector(state, _id));
  const userId = useAppSelector(getUserIdSelector);

  let isLiked = false;

  likes?.forEach((like) => {
    if (like === userId) {
      isLiked = true;
    }
  });

  const date = new Date(createdAt);
  return (
    <PostWrapper>
      {isOwner && (
        <PostEditRemoveWrapper>
          <Link to={`../${_id}/edit`}>
            <PostIconWrapper>
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M18.3785 8.44975L8.9636 17.8648C8.6844 18.144 8.3288 18.3343 7.94161 18.4117L4.99988 19.0001L5.58823 16.0583C5.66566 15.6711 5.85597 15.3155 6.13517 15.0363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132"
                    stroke="#71aaeb"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </PostIconWrapper>
          </Link>
          <PostIconWrapper
            onClick={async () => {
              await dispatch(fetchRemovePost(_id));
              dispatch(fetchTags());
            }}
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCaredrediered" stredoke-width="0"></g>
              <g
                id="SVGRepo_tredaceredCaredrediered"
                stredoke-linecap="redound"
                stredoke-linejoin="redound"
              ></g>
              <g id="SVGRepo_iconCaredrediered">
                <path
                  fill-redule="evenodd"
                  clip-redule="evenodd"
                  d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                  fill="red"
                ></path>
              </g>
            </svg>
          </PostIconWrapper>
        </PostEditRemoveWrapper>
      )}
      <>
        {imageUrl && <PostImg src={`${BASE_URL}${imageUrl}`} loading="lazy" />}

        <PostUserInfo>
          <Avatar src={`${BASE_URL}${user.avatarUrl}`} />
          <AvatarInfo>
            <UserName>{user.fullName}</UserName>
            <PostDate>{date.toDateString()}</PostDate>
          </AvatarInfo>
        </PostUserInfo>
        <PostInfo>
          <PostTitle>{title}</PostTitle>
          <PostTagWrapper>
            {tags.map((tag, i) => {
              return <PostTag key={i}>#{tag}</PostTag>;
            })}
          </PostTagWrapper>
          <Link
            to={`../${_id}`}
            style={{
              textDecorationColor: theme.colors.font,
              color: theme.colors.font,
            }}
          >
            Перейти на страницу поста
          </Link>
          <IconsWrapper>
            <IconWrapper>
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    stroke={theme.colors.font}
                    stroke-width="1.5"
                  ></path>{" "}
                  <path
                    d="M6.94975 7.05025C9.68342 4.31658 14.1156 4.31658 16.8492 7.05025L18.9706 9.17157C20.3039 10.5049 20.9706 11.1716 20.9706 12C20.9706 12.8284 20.3039 13.4951 18.9706 14.8284L16.8492 16.9497C14.1156 19.6834 9.68342 19.6834 6.94975 16.9497L4.82843 14.8284C3.49509 13.4951 2.82843 12.8284 2.82843 12C2.82843 11.1716 3.49509 10.5049 4.82843 9.17157L6.94975 7.05025Z"
                    stroke={theme.colors.font}
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <IconInfo>{viewsCount}</IconInfo>
            </IconWrapper>
            <IconWrapper>
              {isLiked ? (
                <AiFillLike
                  onClick={async () => {
                    dispatch(unlike(_id));
                  }}
                  style={{
                    color: `${theme.colors.font}`,
                    width: "22px",
                    height: "22px",
                    cursor: "pointer",
                    zIndex: "100",
                  }}
                />
              ) : (
                <AiOutlineLike
                  onClick={async () => {
                    dispatch(like(_id));
                  }}
                  style={{
                    color: `${theme.colors.font}`,
                    width: "22px",
                    height: "22px",
                    cursor: "pointer",
                    zIndex: "100",
                  }}
                />
              )}
              <IconInfo>{likes?.length || 0}</IconInfo>
            </IconWrapper>
          </IconsWrapper>
        </PostInfo>
      </>
    </PostWrapper>
  );
};

export default Post;
