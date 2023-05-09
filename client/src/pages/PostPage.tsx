import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { $authHost, $host } from "../axios/axios";
import { Container } from "../components/Container";
import {
  Avatar,
  AvatarInfo,
  IconInfo,
  IconsWrapper,
  IconWrapper,
  PostDate,
  PostImg,
  PostInfo,
  PostTag,
  PostTagWrapper,
  PostTitle,
  PostUserInfo,
  PostWrapper,
  UserName,
} from "../components/Post";
import Spinner from "../components/Loaders/Spinner";
import { IPost } from "../types/Post";
import { BASE_URL } from "../utils/consts";
import AddComment from "../components/AddComment";
import { IComment } from "../types/Comment";
import CommentsList from "../components/CommentsList";
import { useAppDispatch, useAppSelector } from "../redux/redux-hook";
import {
  getThemeSelector,
  getUserIdSelector,
} from "../redux/slices/authSlice/selectors";
import { ThemeEnums } from "../types/styled";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { like, unlike } from "../redux/slices/postsSlice/postsSlice";
import { getPostLikesSelector } from "../redux/slices/postsSlice/selectors";

const PostPageContainer = styled(Container)`
  width: 800px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const PostPageWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.componentBg};
  border-radius: 10px;
  padding: 20px;
  min-width: 100%;
  position: relative;
`;

const PostTextWrapper = styled.p`
  color: ${(props) => props.theme.colors.font};
  font-size: 15px;
  margin-bottom: 15px;
`;

const PostPage = () => {
  const theme = useAppSelector(getThemeSelector);
  const { id } = useParams();
  const [post, setPost] = useState<IPost>({
    _id: "",
    createdAt: "",
    tags: [""],
    likes: [""],
    text: "",
    imageUrl: "",
    title: "",
    updatedAt: "",
    viewsCount: 0,
    user: {
      _id: "",
      avatarUrl: "",
      email: "",
      friends: [],
      theme: ThemeEnums.light,
      fullName: "",
      createdAt: "",
      updatedAt: "",
    },
  });
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const likes = useAppSelector((state) =>
    getPostLikesSelector(state, post._id)
  );
  const userId = useAppSelector(getUserIdSelector);
  const dispatch = useAppDispatch();

  const date = new Date(post?.createdAt || "");

  let isLiked = false;

  likes?.forEach((like) => {
    if (like === userId) {
      isLiked = true;
    }
  });

  useEffect(() => {
    $authHost.get(`/posts/${id}`).then((res) => {
      setPost(res.data as IPost);
      setIsLoading(false);
    });
    $authHost
      .get(`/comments`, {
        params: {
          id,
        },
      })
      .then((res) => {
        setComments(res.data as IComment[]);
      });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <PostPageContainer>
      <PostPageWrapper>
        {post.imageUrl && (
          <PostImg src={`${BASE_URL}${post.imageUrl}`} loading="lazy" />
        )}
        <PostUserInfo>
          <Avatar src={`${BASE_URL}${post.user.avatarUrl}`} loading="lazy" />
          <AvatarInfo>
            <UserName>{post.user.fullName}</UserName>
            <PostDate>{date.toDateString()}</PostDate>
          </AvatarInfo>
        </PostUserInfo>
        <PostInfo>
          <PostTitle>{post.title}</PostTitle>
          <PostTagWrapper>
            {post.tags.map((tag, i) => {
              return <PostTag key={i}>#{tag}</PostTag>;
            })}
          </PostTagWrapper>
          <PostTextWrapper>
            <ReactMarkdown children={post?.text} />
          </PostTextWrapper>
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
              <IconInfo>{post?.viewsCount}</IconInfo>
            </IconWrapper>
            <IconWrapper>
              {isLiked ? (
                <AiFillLike
                  onClick={async () => {
                    const { payload } = await dispatch<any>(unlike(post._id));
                    setPost({ ...post, likes: payload.likes });
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
                    const { payload } = await dispatch<any>(like(post._id));
                    console.log();
                    setPost({ ...post, likes: payload.likes });
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
      </PostPageWrapper>
      <CommentsList comments={comments} />
      <AddComment
        postId={post._id}
        setComments={setComments}
        comments={comments}
      />
    </PostPageContainer>
  );
};

export default PostPage;
