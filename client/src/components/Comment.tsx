import React from 'react';
import styled from 'styled-components';
import { UserName } from './Post';
import { IUser } from '../types/User';

const CommentWrapper = styled.div`
    background-color: ${(props) => props.theme.colors.componentBg};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

const UserWrapper = styled.div`
    display: flex;
    column-gap: 10px;
    align-items: center;
`;
const CommentText = styled.div`
    color: ${(props) => props.theme.colors.font};
    padding-left: 50px;
    font-size: 13px;
    font-weight: 400;
`;

type CommentProps = {
    user: IUser;
    comment: string;
};

const Comment = ({ user: { avatarUrl, fullName }, comment }: CommentProps) => {
    return (
        <CommentWrapper>
            <UserWrapper>
                <Avatar src={avatarUrl} />
                <UserName>{fullName}</UserName>
            </UserWrapper>
            <CommentText>{comment}</CommentText>
        </CommentWrapper>
    );
};

export default Comment;
