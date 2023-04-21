import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import { RouterProvider } from 'react-router-dom';
import store from './redux/store';
import { router } from './router';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
