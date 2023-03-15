import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
    background-color: ${(props) => props.theme.dark.component};
    height: 48px;
`;

const Header = () => {
    return <HeaderWrapper></HeaderWrapper>;
};

export default Header;
