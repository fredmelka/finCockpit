
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Space } from "antd";
import { getUser } from '../app/Crud'

export default function Login () {

let { Search } = Input;
let [username, setUsername] = useState();
let navigate = useNavigate();

let updateName = (event) => {setUsername(event.target.value)};

async function logUser (username) {

    let userObject = await getUser(username);
    console.log(await userObject._id);
    navigate(`/watchlist/${userObject._id}`);
};

return (
    <>
    <h3>Please enter your username to sign in</h3>
    <Space direction='vertical'>
        <Search
            addonBefore='Client'
            allowClear
            type='text'
            value={username}
            placeholder='Username only please!'
            enterButton
            onChange={updateName}
            onSearch={() => {logUser(username)}}
             />
    </Space>

    </>);
};