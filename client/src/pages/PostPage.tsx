import React, { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { $authHost, $host } from '../axios/axios';
import { Container } from '../components/Container';
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
} from '../components/Post';
import Spinner from '../components/Spinner';
import { IPost } from '../types/Post';
import { BASE_URL } from '../utils/consts';
import AddComment from '../components/AddComment';
import { IComment } from '../types/Comment';
import CommentsList from '../components/CommentsList';
import { useAppSelector } from '../redux/redux-hook';
import { getThemeSelector } from '../redux/slices/authSlice/selectors';

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
        _id: '',
        createdAt: '',
        tags: [''],
        text: '',
        imageUrl: '',
        title: '',
        updatedAt: '',
        viewsCount: 0,
        user: {
            _id: '',
            avatarUrl: '',
            email: '',
            fullName: '',
            createdAt: '',
            updatedAt: '',
        },
    });
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const date = new Date(post?.createdAt || '');

    useEffect(() => {
        $host.get(`/posts/${id}`).then((res) => {
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
                    <PostImg
                        src={`${BASE_URL}${post.imageUrl}`}
                        loading='lazy'
                    />
                )}
                <PostUserInfo>
                    <Avatar src={post.user.avatarUrl} loading='lazy' />
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
                                width='25px'
                                height='25px'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                                <g
                                    id='SVGRepo_tracerCarrier'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                ></g>
                                <g id='SVGRepo_iconCarrier'>
                                    {' '}
                                    <path
                                        d='M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z'
                                        stroke={theme.colors.font}
                                        stroke-width='1.5'
                                    ></path>{' '}
                                    <path
                                        d='M6.94975 7.05025C9.68342 4.31658 14.1156 4.31658 16.8492 7.05025L18.9706 9.17157C20.3039 10.5049 20.9706 11.1716 20.9706 12C20.9706 12.8284 20.3039 13.4951 18.9706 14.8284L16.8492 16.9497C14.1156 19.6834 9.68342 19.6834 6.94975 16.9497L4.82843 14.8284C3.49509 13.4951 2.82843 12.8284 2.82843 12C2.82843 11.1716 3.49509 10.5049 4.82843 9.17157L6.94975 7.05025Z'
                                        stroke={theme.colors.font}
                                        stroke-width='1.5'
                                        stroke-linejoin='round'
                                    ></path>{' '}
                                </g>
                            </svg>
                            <IconInfo>{post?.viewsCount}</IconInfo>
                        </IconWrapper>
                        <IconWrapper>
                            <svg
                                width='25px'
                                height='25px'
                                viewBox='0 0 25 25'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                                <g
                                    id='SVGRepo_tracerCarrier'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                ></g>
                                <g id='SVGRepo_iconCarrier'>
                                    {' '}
                                    <path
                                        d='M7.5 16.5H9.5V20.5L13.5 16.5H17.5C18.6046 16.5 19.5 15.6046 19.5 14.5V8.5C19.5 7.39543 18.6046 6.5 17.5 6.5H7.5C6.39543 6.5 5.5 7.39543 5.5 8.5V14.5C5.5 15.6046 6.39543 16.5 7.5 16.5Z'
                                        stroke={theme.colors.font}
                                        stroke-width='1.5'
                                    ></path>{' '}
                                </g>
                            </svg>
                            <IconInfo>3</IconInfo>
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
