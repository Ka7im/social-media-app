import { useCallback, useEffect, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonWithIcon } from '../components/ButtonWithIcon';
import Layout from '../components/Layout';
import Post, { PostWrapper } from '../components/Post';
import PostSkeleton from '../components/PostSkeleton';
import { ButtonTitle, IconWrapper } from '../components/Sidebar';
import Tags, { TagsTitle, TagsWrapper } from '../components/Tags';
import TagSkeleton from '../components/TagSkeleton';
import { useAppDispatch, useAppSelector } from '../redux/redux-hook';
import {
    getTagFilterSelector,
    getUserDataSelector,
    isAuthSelector,
} from '../redux/slices/authSlice/selectors';
import {
    fetchPosts,
    fetchTags,
    increasePage,
    Status,
} from '../redux/slices/postsSlice/postsSlice';
import {
    getPostCountSelector,
    getPostLimitSelector,
    getPostPageSelector,
    getPostsSelector,
    getPostStatusSelector,
    getTagsStatusSelector,
} from '../redux/slices/postsSlice/selectors';
import useScroll from '../utils/hooks/useScroll';
import { baseTheme } from '../utils/theme';

const PostsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    justify-content: center;
`;

const PostsSidebar = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`;

const PostsButtonWithIcon = styled(ButtonWithIcon)`
    display: flex;
    column-gap: 8px;
    padding: 15px;
    height: 50px;
    border-radius: 25px;
    border: 1px solid #fff;
    cursor: pointer;
`;

const PostsButtonTitle = styled(ButtonTitle)`
    font-size: 15px;
`;

const CreatePostWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    row-gap: 5px;
    flex-wrap: wrap;
    border: 1px solid ${(props) => props.theme.colors.border};
    background-color: ${(props) => props.theme.colors.componentBg};
    border-radius: 10px;
    height: max-content;
    padding: 20px;
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
        return <Navigate to='/login' />;
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
                        {postStatus === Status.Loading && (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='40px'
                                height='40px'
                                viewBox='0 0 100 100'
                                preserveAspectRatio='xMidYMid'
                            >
                                <circle
                                    cx='50'
                                    cy='50'
                                    fill='none'
                                    stroke={baseTheme.mainColor}
                                    stroke-width='10'
                                    r='35'
                                    stroke-dasharray='164.93361431346415 56.97787143782138'
                                >
                                    <animateTransform
                                        attributeName='transform'
                                        type='rotate'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='0 50 50;360 50 50'
                                        keyTimes='0;1'
                                    />
                                </circle>
                            </svg>
                        )}
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
                    <CreatePostWrapper>
                        <Link to='/add-post' style={{ textDecoration: 'none' }}>
                            <PostsButtonWithIcon>
                                <IconWrapper>
                                    <svg
                                        width='30px'
                                        height='30px'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g
                                            id='SVGRepo_bgCarrier'
                                            stroke-width='0'
                                        ></g>
                                        <g
                                            id='SVGRepo_tracerCarrier'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        ></g>
                                        <g id='SVGRepo_iconCarrier'>
                                            <path
                                                fill-rule='evenodd'
                                                clip-rule='evenodd'
                                                d='M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z'
                                                fill={baseTheme.mainColor}
                                            ></path>
                                        </g>
                                    </svg>
                                </IconWrapper>
                                <PostsButtonTitle>
                                    Написать пост
                                </PostsButtonTitle>
                            </PostsButtonWithIcon>
                        </Link>
                    </CreatePostWrapper>
                </PostsSidebar>
            </>
        </Layout>
    );
};

export default Posts;
