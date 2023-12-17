
import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../pages/Header.jsx';
import Footer from '../pages/Footer.jsx';

export default function Root () {

return (
    <>
    <Header />
    <main>
        <Outlet />
    </main>
    <Footer />    
    </>);
};