import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../utils/consts';

const MessageWrapper = styled.li`
    display: flex;
    column-gap: 15px;
    width: 100%;
    height: min-content;
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 36px;
    height: 36px;
`;

const InfoWrapper = styled.div`
    display: grid:
`;

const UserName = styled.div`
    color: #71aaeb;
    font-weight: 700;
    font-size: 12.5px;
`;

const Mess = styled.div`
    font-size: 15px;
    color: #fff;
    font-weight: 400;
`;

type MessageProps = {
    message: string;
    userName: string;
    avatarUrl: string;
};

const Message = ({ message, userName, avatarUrl }: MessageProps) => {
    return (
        <MessageWrapper>
            <Avatar src={avatarUrl} />
            <InfoWrapper>
                <UserName>{userName}</UserName>
                <Mess>{message}</Mess>
            </InfoWrapper>
        </MessageWrapper>
    );
};

export default Message;
