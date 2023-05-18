
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { message, Row, Col, Tag } from 'antd';


export default function Header () {

let userId = localStorage.getItem('myFinCockpituserId');

let navigate = useNavigate();

let [messageApi, contextHolder] = message.useMessage();
let messageLogout = (value) => messageApi.open({type: 'warning', content: `Good bye ${value}!`});

let logOut = () => {
    messageLogout(localStorage.getItem('myFinCockpitusername'));
    localStorage.removeItem('myFinCockpituserId');
    localStorage.removeItem('myFinCockpitusername');
    navigate('/');
};

return (
    <>
    {contextHolder}
    <header>
    <Row>
    <Col span={22} offset={1}>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/securities'>Securities</NavLink>
        <NavLink to='/watchlist'>Watch List</NavLink>
        <NavLink to='/resources'>Resources</NavLink>
        {(userId) 
                ? <Tag onClick={logOut} color='red'>Log Out</Tag>
                : <NavLink to='/login'><Tag color='#12934f'>Log In</Tag></NavLink>}
        <NavLink to='/signup'><Tag color='geekblue-inverse'> Sign Up</Tag></NavLink>
    </Col>
    </Row>
    </header>
    </>);
};