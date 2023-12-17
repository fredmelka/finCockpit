
import React, {useState, useEffect, useContext} from 'react';
import {Col, message, Row, Space} from 'antd';
import axios from 'axios';
import {AuthContext} from '../context/Auth.context.jsx';
import SecurityListCard from '../pages/SecurityListCard.jsx';
import SecurityDES from '../pages/SecurityDESCard.jsx';
import {getWatchlist, removeFromWatchlist} from '../utils/Crud.js';
import {_AVapikey_1, _AVapikey_2} from '../utils/Keys.js';

// GET request to <alphavantage.co> @ 'SYMBOL_SEARCH' endpoint
const urlEndpointAlphaVantage = 'https://www.alphavantage.co/query?function=OVERVIEW';

export default function Watchlist () {

let {userId} = useContext(AuthContext);

let [watchlist, setWatchlist] = useState([]);
let [companyOverview, setCompanyOverview] = useState({});

let [messageApi, contextHolder] = message.useMessage();
let messagePop = (type, value) => messageApi.open({type: type, content: value});

let browseListFromUser = async () => {
try {let list = await getWatchlist(userId); setWatchlist(list);}
catch (error) {console.log(error)};
};

let getSecurityOverview = async (value) => {
try {
    let response = await axios.get(`${urlEndpointAlphaVantage}&symbol=${value}&apikey=${_AVapikey_1}`);
    let overviewData = response.data; setCompanyOverview(overviewData);}
catch (error) {console.log(error)};
};

let removeSecurity = async (ticker) => {
try {
    let newList = await removeFromWatchlist(userId, watchlist, ticker);
    setWatchlist(newList); setCompanyOverview({});
    messagePop('warning', `Ticker ${ticker} deleted from watchlist`);}
catch (error) {console.log(error)};
};

useEffect(() => {browseListFromUser();}, [userId])

if (!userId) return (<>
    <h2>I am the Watchlist page!</h2>
    <p>You must log in to access your data dude!</p>
    </>);

return (
    <>
    {contextHolder}
    <h2>I am the Watchlist page!</h2>
    <Space direction='vertical' />
    <Row>
        <Col span={6} offset={1}>
        <SecurityListCard style={{textAlign: 'left'}} watchlist={watchlist} getSecurityOverview={getSecurityOverview}/>
        </Col>
        <Col span={15} offset={1}>
        <SecurityDES companyOverview={companyOverview} removeSecurity={removeSecurity}/>
        </Col>
    </Row>  
    </>);
};