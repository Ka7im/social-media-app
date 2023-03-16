import styled from 'styled-components';
import Layout from '../components/Layout';
import Post from '../components/Post';

const PostsWrapper = styled.div`
    display: flex;

    flex-wrap: wrap;
    row-gap: 20px;
`;

const Posts = () => {
    return (
        <Layout>
            <PostsWrapper>
                <Post />
                <Post />
                <Post />
            </PostsWrapper>
        </Layout>
    );
};

export default Posts;
