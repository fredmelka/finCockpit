
import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {

return (
    <header>

        <nav>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/securities'>Securities</NavLink>
        <NavLink to='/watchlist'>Watch List</NavLink>
        <NavLink to='/resources'>Resources</NavLink>
        </nav>

        {/* to be inserted within a ternary operator based on user */}
        <>
        <NavLink to='/profile'>Profile</NavLink>
        <button onClick={()=>{}}>Log Out</button>
        </>
        <NavLink to='/sign-in'>Log In</NavLink>
        <NavLink to='/sign-up'>Sign Up</NavLink>

    </header>);
};

export default Header;