import styled from 'styled-components';

export const Button = styled.div`
    display: block;
    border 1px solid ${(props) => props.theme.colors.font};
    color: ${(props) => props.theme.colors.font};
    padding: 10px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
    width: max-content;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        background-color: ${(props) => props.theme.colors.hover}
    }
`;
