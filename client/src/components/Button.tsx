import styled from 'styled-components';

export const Button = styled.div`
    display: block;
    border 1px solid #fff;
    color: #fff;
    padding: 10px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
    width: max-content;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.dark.hover}
    }
`;
