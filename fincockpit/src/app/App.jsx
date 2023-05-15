
import React from 'react';
import About from '../routes/About.jsx';
import ErrorPage from '../routes/Error.jsx';
import Oopsies from '../routes/Oopsies.jsx';
import Resources from '../routes/Resources.jsx';
import Root from '../routes/Root.jsx';
import Securities from '../routes/Securities.jsx';
import Watchlist from '../routes/Watchlist.jsx';
import Welcome from '../routes/Welcome.jsx';

import { Route } from 'react-router-dom';
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import './App.css';

export default function App() {

//declare here variable 'router' under which all routes and paths are set for web navigation
const router = createBrowserRouter( createRoutesFromElements(
  <Route path='/' element={ <Root /> } errorElement={ <ErrorPage /> }>

    <Route index='true' element={ <Welcome /> } />
    
    <Route path='/about' element={ <About /> } />
    <Route path='/securities' element={ <Securities /> } />
    <Route path='/watchlist' element={ <Watchlist /> } />
    <Route path='/resources' element={ <Resources /> } />

    <Route path='*' element={ <Oopsies /> } />
  </Route>));

return (
  <>
    <RouterProvider router={router} />
  </>);
};