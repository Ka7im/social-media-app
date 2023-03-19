import { lazy, Suspense } from 'react';
import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Spinner from './components/Spinner';
import Authorization from './pages/Authorization';
import Posts from './pages/Posts';

const PostPage = lazy(() => import('./pages/PostPage'));

const routes = createRoutesFromElements(
    <Route path='/' element={<App />}>
        <Route index element={<Posts />} />
        <Route path='authorization' element={<Authorization />} />
        <Route path='login' element={<Authorization />} />
        <Route
            path='/:id'
            element={
                <Suspense fallback={<Spinner />}>
                    <PostPage />
                </Suspense>
            }
        />
    </Route>
);

export const router = createBrowserRouter(routes);
