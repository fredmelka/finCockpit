
import React from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Row, Col, Tag } from 'antd';


export default function Header () {

let navigate = useNavigate();

let userId = localStorage.getItem('myFinCockpituserId');

let logOut = () => {
    localStorage.removeItem('myFinCockpituserId');
    localStorage.removeItem('myFinCockpitusername');
    navigate('/');
};

return (
    <header>
    <Row>
    <Col span={22} offset={1}>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/securities'>Securities</NavLink>
        <NavLink to='/watchlist'>Watch List</NavLink>
        <NavLink to='/resources'>Resources</NavLink>
        {(!userId) && <NavLink to='/login'><Tag color='green-inverse'>Log In</Tag></NavLink>}
        {(userId) && <Tag onClick={logOut} color='red'>Log Out</Tag>}
        <NavLink to='/signup'><Tag color='geekblue-inverse'> Sign Up</Tag></NavLink>
    </Col>
    </Row>
    </header>);
};