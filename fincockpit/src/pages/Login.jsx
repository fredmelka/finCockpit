
import {useState, useContext} from 'react';
import {Alert, Input, Space} from 'antd';
import {AuthContext} from '../context/Auth.context.jsx';

export default function Login () {

let [username, setUsername] = useState();
let {isLogged, userName, logIn} = useContext(AuthContext);
let {Search} = Input;

let updateName = (event) => {setUsername(event.target.value)};

return (
    <>
    <h2>I am the Login page!</h2>
    <h3>Please enter your username to sign in:</h3>
    <Space direction='vertical'>
        <Search
            addonBefore='Client'
            allowClear
            type='text'
            value={username}
            placeholder='Username only please!'
            enterButton
            onChange={updateName}
            onSearch={() => {logIn(username); setUsername();}} />

        {isLogged && <Alert type='info' message={`You are successfully logged in ${userName}!`} />}
    </Space>
    </>);
};