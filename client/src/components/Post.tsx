import styled from 'styled-components';

const PostWrapper = styled.div`
    border: 1px solid #424242;
    background-color: ${(props) => props.theme.dark.component};
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    min-width: 100%;
`;

const PostImg = styled.img`
    border-radius: 10px;
    width: 100%;
    margin-bottom: 15px;
`;

const PostUserInfo = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const AvatarInfo = styled.div`
    display: grid;
`;

const UserName = styled.div`
    color: #71aaeb;
    font-weight: 500;
`;

const PostDate = styled.div`
    color: #fff;
    font-weight: 400;
    font-size: 13px;
`;

const PostInfo = styled.div`
    display: grid;
    padding-left: 50px;
    row-gap: 15px;
`;

const PostTitle = styled.h3`
    font-weight: 700;
    color: #fff;
    font-size: 23px;
`;

const PostTag = styled.div`
    font-size: 15px;
    color: #fff;
`;

const IconsWrapper = styled.div`
    display: flex;
    column-gap: 10px;
`;

const IconWrapper = styled.div`
    display: flex;
    margin-right: 5px;
`;

const IconInfo = styled.div`
    color: #fff;
    align-self: center;
`;

const Post = () => {
    return (
        <PostWrapper>
            <PostImg
                src='http://localhost:5000/uploads/camera_50.png'
                loading='lazy'
            />
            <PostUserInfo>
                <Avatar
                    src='http://localhost:5000/uploads/camera_50.png'
                    loading='lazy'
                />
                <AvatarInfo>
                    <UserName>Kamil Karimov</UserName>
                    <PostDate>12 июня 2022г.</PostDate>
                </AvatarInfo>
            </PostUserInfo>
            <PostInfo>
                <PostTitle>Заголовок поста</PostTitle>
                <PostTag>#react</PostTag>
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
                                    stroke='#fff'
                                    stroke-width='1.5'
                                ></path>{' '}
                                <path
                                    d='M6.94975 7.05025C9.68342 4.31658 14.1156 4.31658 16.8492 7.05025L18.9706 9.17157C20.3039 10.5049 20.9706 11.1716 20.9706 12C20.9706 12.8284 20.3039 13.4951 18.9706 14.8284L16.8492 16.9497C14.1156 19.6834 9.68342 19.6834 6.94975 16.9497L4.82843 14.8284C3.49509 13.4951 2.82843 12.8284 2.82843 12C2.82843 11.1716 3.49509 10.5049 4.82843 9.17157L6.94975 7.05025Z'
                                    stroke='#fff'
                                    stroke-width='1.5'
                                    stroke-linejoin='round'
                                ></path>{' '}
                            </g>
                        </svg>
                        <IconInfo>150</IconInfo>
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
                                    stroke='#fff'
                                    stroke-width='1.5'
                                ></path>{' '}
                            </g>
                        </svg>
                        <IconInfo>3</IconInfo>
                    </IconWrapper>
                </IconsWrapper>
            </PostInfo>
        </PostWrapper>
    );
};

export default Post;
