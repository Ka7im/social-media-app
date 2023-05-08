import { useCallback, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import Post, { PostWrapper } from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";
import Tags, { TagsTitle, TagsWrapper } from "../components/Tags";
import TagSkeleton from "../components/TagSkeleton";
import { useAppDispatch, useAppSelector } from "../redux/redux-hook";
import {
  getTagFilterSelector,
  getUserDataSelector,
  isAuthSelector,
} from "../redux/slices/authSlice/selectors";
import {
  fetchPosts,
  fetchTags,
  increasePage,
  Status,
} from "../redux/slices/postsSlice/postsSlice";
import {
  getPostCountSelector,
  getPostLimitSelector,
  getPostPageSelector,
  getPostsSelector,
  getPostStatusSelector,
  getTagsStatusSelector,
} from "../redux/slices/postsSlice/selectors";
import useScroll from "../utils/hooks/useScroll";
import SmallSpinner from "../components/SmallSpinner/SmallSpinner";

export const PostsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  justify-content: center;
`;

const PostsSidebar = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const Observable = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
`;

const Posts = () => {
  const { posts, tags } = useAppSelector(getPostsSelector);
  const postStatus = useAppSelector(getPostStatusSelector);
  const tagsStatus = useAppSelector(getTagsStatusSelector);
  const isAuth = useAppSelector(isAuthSelector);
  const userData = useAppSelector(getUserDataSelector);
  const page = useAppSelector(getPostPageSelector);
  const count = useAppSelector(getPostCountSelector);
  const limit = useAppSelector(getPostLimitSelector);
  const tagFilter = useAppSelector(getTagFilterSelector);
  const dispatch = useAppDispatch();

  const observable = useRef(null);

  const onIntersect = useCallback(() => {
    if (page < Math.ceil(count / limit)) {
      dispatch(increasePage());
    }
  }, [count, limit, page]);

  useScroll(observable, onIntersect);

  useEffect(() => {
    dispatch(fetchPosts({ page, tagFilter }));
  }, [page, tagFilter]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [page]);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <>
        <PostsWrapper>
          {postStatus === Status.FirstLoading
            ? [...new Array(3)].map((item, i) => {
                return (
                  <PostWrapper key={i}>
                    <PostSkeleton />
                  </PostWrapper>
                );
              })
            : posts.items.map((post) => {
                return (
                  <Post
                    {...post}
                    key={post._id}
                    isOwner={userData?._id === post.user._id}
                  />
                );
              })}

          <Observable ref={observable}>
            {postStatus === Status.Loading && <SmallSpinner />}
          </Observable>
        </PostsWrapper>

        <PostsSidebar>
          {tagsStatus === Status.Loading ? (
            <TagsWrapper>
              <TagsTitle>Теги</TagsTitle>
              {[...new Array(3)].map((item, i) => {
                return <TagSkeleton key={i} />;
              })}
            </TagsWrapper>
          ) : (
            <Tags tags={tags.items} />
          )}
        </PostsSidebar>
      </>
    </Layout>
  );
};

export default Posts;
