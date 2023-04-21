import React from 'react';
import styled from 'styled-components';

export const TagsWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    row-gap: 5px;
    flex-wrap: wrap;
    border: 1px solid ${(props) => props.theme.colors.border};
    background-color: ${(props) => props.theme.colors.componentBg};
    border-radius: 10px;
    height: max-content;
    padding: 20px;
`;

export const TagsTitle = styled.div`
    color: ${(props) => props.theme.colors.font};
    font-weight: 500;
    font-size: 22px;
    margin-bottom: 20px;
`;

const Tag = styled.div`
    color: ${(props) => props.theme.colors.font};
    width: 100%;
    height: 30px;
    border-radius: 8px;
    padding: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.hover};
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
