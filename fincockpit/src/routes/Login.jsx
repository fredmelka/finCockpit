
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Space } from "antd";
import { getUser, createUser } from '../app/Crud'

export default function Login () {

let { Search } = Input;
let [username, setUsername] = useState();
let navigate = useNavigate();

let updateName = (event) => {setUsername(event.target.value)};

return (
    <>
    <h3>Please enter your username to sign in</h3>
    <Space direction='vertical'>
        <Search
            addonBefore='Client'
            allowClear
            type='text'
            value={username}
            placeholder='Ticker, Name, CUSIP, etc.'
            enterButton
            onChange={updateName}
            onSearch={() => {}}
             />
    </Space>

    </>);
};