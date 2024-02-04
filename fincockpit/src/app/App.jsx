
import React from 'react';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import About        from '../pages/About.jsx';
import Browser      from '../pages/Browser.jsx';
import ErrorPage    from '../pages/Error.jsx';
import Login        from '../pages/Login.jsx';
import Oopsies      from '../pages/Oopsies.jsx';
import Resources    from '../pages/Resources.jsx';
import Root         from '../pages/Root.jsx';
import Security     from '../pages/Security.jsx';
import Signup       from '../pages/Signup.jsx';
import Watchlist    from '../pages/Watchlist.jsx';
import Welcome      from '../pages/Welcome.jsx';

import './App.css';

export default function App() {

// Declare here variable 'router' under which all routes and paths are set for web navigation
const router = createBrowserRouter( createRoutesFromElements(
  <Route path='/' element={<Root />} errorElement={<ErrorPage />}>

    <Route index='true' element={<Welcome />} />
    
    <Route path='/about' element={<About />} />
    <Route path='/securities' element={<Browser />} />
    <Route path='/resources' element={<Resources />} />

    <Route path='/watchlist' element={<Watchlist />}>
      <Route path=':ticker' element={<Security />} />
    </Route>

    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />

    <Route path='*' element={<Oopsies />} />
  </Route>));

return (
  <>
  <RouterProvider router={router}/>
  </>);
};