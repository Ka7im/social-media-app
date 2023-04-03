import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Layout from './components/Layout';
import { useAppDispatch, useAppSelector } from './redux/redux-hook';
import { checkAuth } from './redux/slices/authSlice/authSlice';
import { isAuthSelector } from './redux/slices/authSlice/selectors';

const Global = createGlobalStyle`
    *{
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    * ::-webkit-scrollbar {
        display: none;
    }

    body {
        background-color: ${(props) => props.theme.dark.main}
    }
`;

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    return (
        <>
            <Global />
            <Header />
            <Outlet />
        </>
    );
};

export default App;
