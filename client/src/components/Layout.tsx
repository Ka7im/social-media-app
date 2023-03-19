import React from 'react';
import styled from 'styled-components';
import { Container } from './Container';
import Sidebar from './Sidebar';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 0.7fr 2fr 1fr;
    column-gap: 10px;
`;

const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <Container>
            <Grid>
                <Sidebar />
                {children}
            </Grid>
        </Container>
    );
};

export default Layout;
