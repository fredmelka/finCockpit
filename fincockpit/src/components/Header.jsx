
import React                        from "react";
import { NavLink }                  from 'react-router-dom';
import { Row, Col, Tag }                 from 'antd';


export default function Header () {

return (
    <header>
    <Row>
    <Col span={22} offset={1}>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/securities'>Securities</NavLink>
        <NavLink to='/watchlist'>Watch List</NavLink>
        <NavLink to='/resources'>Resources</NavLink>
        <NavLink to='/login'><Tag color='red'>Log In</Tag></NavLink>
        <NavLink to='/signup'><Tag color='geekblue-inverse'> Sign Up</Tag></NavLink>
    </Col>
    {/* <Col span={4} offset={1}>
        {/* <button onClick={()=>{}}>Log Out</button> */}
    {/*</Col> */}
    </Row>
    </header>);
};