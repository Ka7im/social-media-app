import React from 'react';
import styled from 'styled-components';

const TagsWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    row-gap: 5px;
    flex-wrap: wrap;
    border: 1px solid ${(props) => props.theme.dark.text};
    background-color: ${(props) => props.theme.dark.component};
    border-radius: 10px;
    height: max-content;
    padding: 20px;
`;

const TagsTitle = styled.div`
    color: #fff;
    font-weight: 500;
    font-size: 22px;
    margin-bottom: 20px;
`;

const Tag = styled.div`
    color: #fff;
    width: 100%;
    height: 30px;
    border-radius: 8px;
    padding: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.dark.hover};
    }
`;

type TagsProps = {
    tags: string[];
};

const Tags = ({ tags }: TagsProps) => {
    return (
        <TagsWrapper>
            <TagsTitle>Теги</TagsTitle>
            {tags.map((tag, i) => (
                <Tag key={i}># {tag}</Tag>
            ))}
        </TagsWrapper>
    );
};

export default Tags;
