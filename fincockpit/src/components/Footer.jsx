
import React, {useContext}          from 'react';
import {useNavigate}                from 'react-router-dom';
import {Divider, Tag, Typography}   from 'antd';
import {AuthContext}                from '../context/Auth.context.jsx';

export default function Footer () {

let {userName, userId} = useContext(AuthContext);
let {Text} = Typography;
let navigate = useNavigate();

let goHome = () => navigate('/'); let goBack = () => navigate(-1); let goForward = () => navigate(+1);

return (
    <footer>
    <Divider>
        {(userId)
                ? <Tag color='#12934f'>{userName}</Tag>
                : <Tag color='#1f1f1f'>No user connected</Tag>}
        <Text onClick={goHome} code>Coders at work | Show me the money baby!</Text>
        <Tag color='geekblue-inverse' onClick={goBack}>Back</Tag>
        <Tag color='geekblue-inverse' onClick={goForward}>Forward</Tag>
    </Divider>
    </footer>);
};