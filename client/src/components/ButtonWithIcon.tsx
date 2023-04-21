import styled from 'styled-components';

export const ButtonWithIcon = styled.div`
    display: grid;
    height: 30px;
    column-gap: 5px;
    grid-template-columns: 40px 100px;
    border-radius: 8px;
    width: max-content;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.hover};
    }
`;
