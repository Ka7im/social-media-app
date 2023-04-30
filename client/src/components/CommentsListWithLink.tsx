import React from 'react';
import { IComment } from '../types/Comment';
import Comment from './Comment';
import { Link } from 'react-router-dom';

type CommentsListProps = {
    comments: IComment[];
};

const CommentsList = ({ comments }: CommentsListProps) => {
    return (
        <>
            {comments.map((comment) => {
                return (
                    <Link
                        to={`../${comment.post}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <Comment
                            user={comment.user}
                            comment={comment.comment}
                        />
                    </Link>
                );
            })}
        </>
    );
};

export default CommentsList;
