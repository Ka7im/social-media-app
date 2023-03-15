import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';

const Global = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const App = () => {
    return (
        <>
            <Global />
            <Header />
        </>
    );
};

export default App;
