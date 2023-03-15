import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { router } from './router';

const theme: DefaultTheme = {
    dark: {
        component: '#222222',
    },
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement
);

root.render(
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
);
