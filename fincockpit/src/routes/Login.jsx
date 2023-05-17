
import React, { useState }                  from "react";
import { Input, Space, Typography }         from "antd";
import { getUser }                          from '../app/Crud'


export default function Login () {

let { Search } = Input;
let { Text } = Typography;
let [username, setUsername] = useState();
let [showLogStatus, setShowLogStatus] = useState(false);

let updateName = (event) => {setUsername(event.target.value)};

async function logUser (username) {
try {
    let userObject = await getUser(username);
    console.log(await userObject._id);
    if (userObject) {   localStorage.setItem('myFinCockpituserId', userObject._id);
                        localStorage.setItem('myFinCockpitusername', userObject.owner);
                        setShowLogStatus(true);}
                    else {console.log('Could not login, please check.')};

    console.log('storage', localStorage.getItem('myFinCockpituserId'), localStorage.getItem('myFinCockpitusername'));
    setUsername('');
    return userObject;}
catch (error) {console.log(error)};
};

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
            onSearch={() => {logUser(username)}}/>
        
        {showLogStatus && <Text type='success'>You have successfully logged in! Welcome back {localStorage.getItem('myFinCockpitusername')}!</Text>}
    </Space>
    </>);
};