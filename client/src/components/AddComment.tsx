import React, { useState } from 'react';
import styled from 'styled-components';
import { $authHost } from '../axios/axios';
import { IComment } from '../types/Comment';

const AddCommentWrapper = styled.form`
    background-color: ${(props) => props.theme.colors.componentBg};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 10px;
    padding: 20px;
`;

const AddCommentInput = styled.input`
    background-color: ${(props) => props.theme.colors.input};
    width: 80%;
    border: none;
    padding: 5px;
    outline: none;
    color: ${(props) => props.theme.colors.font};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 10px;
    margin-right: 15px;
`;

const AddCommentButton = styled.button`
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.font};
    color: ${(props) => props.theme.colors.font};
    background-color: transparent;
    padding: 5px 10px;
    cursor: pointer;
`;

type AddCommentProps = {
    postId: string;
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
    comments: IComment[];
};

const AddComment = ({ postId, setComments, comments }: AddCommentProps) => {
    const [value, setValue] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newComment = {
            comment: value,
            postId,
        };

        const { data } = await $authHost.post('/comments', newComment);

        setComments([...comments, data]);
        setValue('');
    };

    return (
        <AddCommentWrapper onSubmit={onSubmit}>
            <AddCommentInput
                placeholder='Напишите что-нибудь...'
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <AddCommentButton type='submit'>Отправить</AddCommentButton>
        </AddCommentWrapper>
    );
};

export default AddComment;
