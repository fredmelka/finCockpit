
import React from 'react';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';

import About        from '../pages/About.jsx';
import Browser      from '../pages/Securities.Browser.jsx';
import ErrorPage    from '../pages/Error.jsx';
import Login        from '../pages/Login.jsx';
import Lookup       from '../pages/Securities.Lookup.jsx';
import Oopsies      from '../pages/Oopsies.jsx';
import Resources    from '../pages/Resources.jsx';
import Root         from '../pages/Root.jsx';
import Security     from '../pages/Security.jsx';
import Securities   from '../pages/Securities.Menu.jsx';
import Signup       from '../pages/Signup.jsx';
import Watchlist    from '../pages/Watchlist.jsx';
import Welcome      from '../pages/Welcome.jsx';

import Development  from '../pages/Development.jsx'; // Temporary Development page

import './App.css';

export default function App() {

// Declare here variable 'router' under which all routes and paths are set for web navigation
const router = createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<Root />} errorElement={<ErrorPage />}>
    <Route index='true' element={<Welcome />} />
    <Route path='/about' element={<About />} />
    <Route path='/securities' element={<Securities />}>
        <Route path='lookup' element={<Lookup />} />
        <Route path='browser' element={<Browser />} />
    </Route>
    <Route path='/resources' element={<Resources />} />
    <Route path='/watchlist' element={<Watchlist />}>
        <Route path=':ticker' element={<Security />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/developer' element={<Development />} />
    <Route path='*' element={<Oopsies />} />
</Route>),
/*** Migration Steps as Future flags for migration towards React-Router v7.
 * https://reactrouter.com/6.28.0/upgrading/future | https://remix.run/blog/future-flags */
{future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true}}
);

return (
  <>
  <RouterProvider router={router} future={{v7_startTransition: true}} /> {/* Future flags for migration towards React-Router v7 */}
  </>);
};