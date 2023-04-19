import React from 'react';
import { IComment } from '../types/Comment';
import Comment from './Comment';

type CommentsListProps = {
    comments: IComment[];
};

const CommentsList = ({ comments }: CommentsListProps) => {
    return (
        <>
            {comments.map((comment) => {
                return <Comment user={comment.user} comment={comment.comment} />;
            })}
        </>
    );
};

export default CommentsList;
