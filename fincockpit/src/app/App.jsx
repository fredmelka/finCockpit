
import React from 'react';
import Root from '../components/Root';

import { Route } from 'react-router-dom';
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';


import './App.css';



function App() {

//declare here under the variable 'router' all routes and path for navigation and mapping
const router = createBrowserRouter( createRoutesFromElements(
  <Route path='/' element={ <Root />}>
        

  </Route>));

return (
  <>
    <RouterProvider router={router} />
  </>);
};

export default App;



// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'

// import { useState } from 'react';
// const [count, setCount] = useState(0);

      // <div>
      //   <a href="https://vitejs.dev" target="_blank">
      //     <img src={viteLogo} className="logo" alt="Vite logo" />
      //   </a>
      //   <a href="https://react.dev" target="_blank">
      //     <img src={reactLogo} className="logo react" alt="React logo" />
      //   </a>
      // </div>
      // <p>
      //   Edit <code>src/App.jsx</code> and save to test HMR
      // </p>
      // <div className="card">
      //   <button onClick={() => setCount((count) => count + 1)}>
      //     count is {count}
      //   </button>
      // </div>
      // <p className="read-the-docs">
      // </p>