import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Layout from './components/Layout';
import { useAppDispatch, useAppSelector } from './redux/redux-hook';
import { checkAuth } from './redux/slices/authSlice/authSlice';
import {
    getThemeSelector,
    isAuthSelector,
} from './redux/slices/authSlice/selectors';
import { IconContext } from 'react-icons';

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
        background-color: ${(props) => props.theme.colors.bg}
    }

    .react-icons {
        width: 20px;
        height: 20px;
        color: #6f6f6f;
    }
`;

const App = () => {
    const theme = useAppSelector(getThemeSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <IconContext.Provider value={{ className: 'react-icons' }}>
                <Global />
                <Header />
                <Outlet />
            </IconContext.Provider>
        </ThemeProvider>
    );
};

export default App;
