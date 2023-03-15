import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const routes = createRoutesFromElements(
    <Route path='authorization' element={<App />}></Route>
);

export const router = createBrowserRouter(routes);
