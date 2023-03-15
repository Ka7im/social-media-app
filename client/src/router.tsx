import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Authorization from './pages/Authorization';

const routes = createRoutesFromElements(
    <Route path='/' element={<App />}>
        <Route path='authorization' element={<Authorization />} />
    </Route>
);

export const router = createBrowserRouter(routes);
