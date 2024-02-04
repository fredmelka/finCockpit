
import React, {useState, useEffect, useContext} from 'react';
import {Outlet} from 'react-router-dom';
import {Col, message, Row, Space} from 'antd';
import {AuthContext} from '../context/Auth.context.jsx';
import WatchedList from '../components/WatchedList.jsx';
import {getWatchlist, removeFromWatchlist} from '../utils/Crud.js';

export default function Watchlist () {

let {userId} = useContext(AuthContext);
let [watchlist, setWatchlist] = useState([]);

let [messageApi, contextHolder] = message.useMessage();
let messagePop = (type, value) => messageApi.open({type: type, content: value});

let browseWatchlistFromUser = async () => {
try {let list = await getWatchlist(userId); setWatchlist(list);}
catch (error) {console.log(error)};
};

let removeSecurityFromWatchlist = async (ticker) => {
try {
    let newList = await removeFromWatchlist(userId, watchlist, ticker);
    setWatchlist(newList);
    messagePop('warning', `Ticker ${ticker} deleted from watchlist`);}
catch (error) {console.log(error)};
};

useEffect(() => {browseWatchlistFromUser();}, [])

if (!userId) return (<>
    <h2>I am the Watchlist page!</h2>
    <p>You must log in to access data.</p>
    </>);

return (
    <>
    {contextHolder}
    <h2>I am the Watchlist page!</h2>
    <Space direction='vertical'/>
    <Row>
        <Col span={8}>
            <WatchedList style={{textAlign:'left'}} watchlist={watchlist}/>
        </Col>
        <Col span={15} offset={1}>
            <Outlet context={removeSecurityFromWatchlist}/>
        </Col>
    </Row>  
    </>);
};