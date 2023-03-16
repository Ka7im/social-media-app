import React from 'react';
import { Outlet } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Layout from './components/Layout';

const Global = createGlobalStyle`
    *{
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${(props) => props.theme.dark.main}
    }
`;

const App = () => {
    return (
        <>
            <Global />
            <Header />
            <Outlet />
        </>
    );
};

export default App;
