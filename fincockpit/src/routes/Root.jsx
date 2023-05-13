
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Root () {

return (
    <>
    <Header />
    <main>
        <h1>I am the Root page!</h1>
        <Outlet />
    </main>
    <Footer />    
    </>);
};