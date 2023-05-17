
import React                        from "react";
import { NavLink }                  from 'react-router-dom';
import { Row, Col }                 from 'antd';


export default function Header () {

return (
    <header>
    <Row>
    <Col span={10} offset={1}>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/securities'>Securities</NavLink>
        <NavLink to='/watchlist'>Watch List</NavLink>
        <NavLink to='/resources'>Resources</NavLink>
    </Col>
    <Col span={3} offset={8}>
        {/* <button onClick={()=>{}}>Log Out</button> */}
        <NavLink to='/login'>Log In</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
    </Col>
    </Row>
    </header>);
};