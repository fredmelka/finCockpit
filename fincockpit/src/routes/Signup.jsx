
import React, { useState }                  from "react";
import { useNavigate, Link }                from 'react-router-dom';
import { Input, Space, Typography }         from 'antd';
import { createUser }                       from '../app/Crud.js'


export default function Signup () {

let { Search } = Input;
let { Text } = Typography;
let [username, setUsername] = useState();
let [userId, setUserId] = useState(null);
let navigate = useNavigate();

let updateName = (event) => {setUsername(event.target.value)};
let goToLoginPage = (event) => {event.preventDefault(); navigate('/login');};

async function signUp (x) {
try {
    let user = await createUser(x);
    console.log(await user);
    setUserId(user)
    return user}
catch (error) {console.log(error)};
};

return (
    <>
    <h2>I am the Signup Page!</h2>
    <h3>Please enter your username to sign up:</h3>
    <Space direction='vertical'>
        <Search
            addonBefore='Client'
            allowClear
            type='text'
            value={username}
            placeholder='Username only please!'
            enterButton
            onChange={updateName}
            onSearch={() => {signUp(username)}}/>
    {userId &&  <>
                <Text type='success'>You have successfully created your account! We are so happy that you join!</Text>
                <Text type='success'> Click here to login <Tag onClick={goToLoginPage}>here</Tag>.</Text>
                </>}
    </Space>
    </>);
};