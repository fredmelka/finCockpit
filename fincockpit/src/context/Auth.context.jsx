
import React, {useState, useEffect} from 'react';
import {message} from 'antd';
import {getUser} from '../utils/Crud.js';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

let [isLogged, setIsLogged] = useState(false);
let [userName, setUserName] = useState(null);
let [userId, setUserId] = useState(null);
// let [isLoading, setIsLoading] = useState(false);

let [messageApi, contextHolder] = message.useMessage();
let messageWelcome = (value) => messageApi.open({type: 'success', content: `Welcome back ${value}!`});
let messageLogout = (value) => messageApi.open({type: 'warning', content: `Goodbye ${value}!`});
let messageError = () => messageApi.open({type: 'error', content: `Wrong credentials or connection error.`});

let store = (user) => {
    localStorage.setItem('myFinCockpituserId', user._id);
    localStorage.setItem('myFinCockpitusername', user.owner);
};
let clear = () => {
    localStorage.removeItem('myFinCockpituserId');
    localStorage.removeItem('myFinCockpitusername');
};
let authenticate = () => {
    let storedId = localStorage.getItem('myFinCockpituserId'); 
    let storedUser = localStorage.getItem('myFinCockpitusername');
    if (storedId && storedUser) {setIsLogged(true); setUserId(storedId); setUserName(storedUser);}
    else {setIsLogged(false); setUserId(null); setUserName(null);};
};
let logIn = async (user) => {
    try {user = await getUser(user);} catch (error){console.log(error);};
    if (user) {store(user); setIsLogged(true); setUserId(user._id); setUserName(user.owner); messageWelcome(user.owner);}
    else {setIsLogged(false); setUserId(null); messageError();};
};
let logOut = () => {messageLogout(userName); clear(); setIsLogged(false); setUserId(null); setUserName(null);};

useEffect(() => {authenticate();},[]);

return (
    <>
    {contextHolder}
    <AuthContext.Provider value={{isLogged, userName, userId, logIn, logOut}}>
    {children}
    </AuthContext.Provider>
    </>);
};