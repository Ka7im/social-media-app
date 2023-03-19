import { useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Tags from '../components/Tags';
import { useAppDispatch, useAppSelector } from '../redux/redux-hook';
import { fetchPosts, fetchTags } from '../redux/slices/postsSlice/postsSlice';
import { getPostsSelector } from '../redux/slices/postsSlice/selectors';

const PostsWrapper = styled.div`
    display: flex;

    flex-wrap: wrap;
    row-gap: 20px;
`;

const Posts = () => {
    const { posts, tags } = useAppSelector(getPostsSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, []);

    return (
        <Layout>
            <>
                <PostsWrapper>
                    {posts.items.map((post) => {
                        return <Post {...post} key={post._id} />;
                    })}
                </PostsWrapper>
                <Tags tags={tags.items} />
            </>
        </Layout>
    );
};

export default Posts;
