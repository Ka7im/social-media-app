import React from 'react';
import styled from 'styled-components';
import { Container } from './Container';
import Sidebar from './Sidebar';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 2.5fr 1fr;
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
