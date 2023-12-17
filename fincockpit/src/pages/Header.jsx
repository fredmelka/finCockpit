
import React, {useContext}      from 'react';
import {NavLink, useNavigate}   from 'react-router-dom';
import {AuthContext}            from '../context/Auth.context.jsx';
import {Col, Row, Tag}          from 'antd';

export default function Header () {

let {isLogged, logOut} = useContext(AuthContext);

return (
    <>
    <header>
    <Row>
    <Col span={22} offset={1}>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/securities'>Securities</NavLink>
        <NavLink to='/watchlist'>Watchlist</NavLink>
        <NavLink to='/resources'>Resources</NavLink>
        {(isLogged)
            ? <NavLink to='/'><Tag color='#ff7875' onClick={logOut}>Logout</Tag></NavLink>
            : <>
            <NavLink to='/login'><Tag color='#12934f'>Log In</Tag></NavLink>
            <NavLink to='/signup'><Tag color='geekblue-inverse'> Sign Up</Tag></NavLink>
            </>}
    </Col>
    </Row>
    </header>
    </>);
};