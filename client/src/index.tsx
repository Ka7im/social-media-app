import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import { RouterProvider } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import store from './redux/store';
import { router } from './router';

const theme: DefaultTheme = {
    dark: {
        component: '#222222',
        text: '#6f6f6f',
        selected: '#333333',
        hover: '#6f6f6f',
        main: '#141414',
    },
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement
);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </Provider>
);
