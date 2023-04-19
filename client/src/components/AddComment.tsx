import React, { useState } from 'react';
import styled from 'styled-components';
import { $authHost } from '../axios/axios';
import { IComment } from '../types/Comment';

const AddCommentWrapper = styled.form`
    background-color: ${(props) => props.theme.dark.component};
    border: 1px solid #424242;
    border-radius: 10px;
    padding: 20px;
`;

const AddCommentInput = styled.input`
    background-color: transparent;
    width: 80%;
    border: none;
    padding: 5px;
    outline: none;
    color: #fff;
    border: 1px solid #424242;
    border-radius: 10px;
    margin-right: 15px;
`;

const AddCommentButton = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #fff;
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
