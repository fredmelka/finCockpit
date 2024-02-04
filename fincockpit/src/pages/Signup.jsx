
import React, {useState} from 'react';
import {Input, Space, Typography} from 'antd';
import {createUser} from '../utils/Crud.js';

export default function Signup () {

let [username, setUsername] = useState();
let [userId, setUserId] = useState(null);

let {Search} = Input; let {Text} = Typography;

let updateName = (event) => {setUsername(event.target.value)};

let signUp = async (newUser) => {
try {let userId = await createUser(newUser); setUserId(userId);}
catch (error) {console.log(error)};};

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
    {userId && <Text type='success'>You have successfully created your account!</Text>}
    </Space>
    </>);
};