
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Root = () => {

return (
    <>
        <Header />
        <main>
            <h1>I am the landing page!</h1>
            <p><code>Build under progress... Code editing!</code></p>

            <Outlet />

        </main>
        <Footer />    
    </>);
};

export default Root;