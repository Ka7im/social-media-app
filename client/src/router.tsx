import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Authorization from './pages/Authorization';
import Posts from './pages/Posts';

const routes = createRoutesFromElements(
    <Route path='/' element={<App />}>
        <Route index element={<Posts />} />
        <Route path='authorization' element={<Authorization />} />
        <Route path='login' element={<Authorization />} />
    </Route>
);

export const router = createBrowserRouter(routes);
