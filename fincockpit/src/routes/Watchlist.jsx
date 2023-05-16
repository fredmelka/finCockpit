
import React                                    from 'react';
import { useState, useEffect }                  from 'react';
import { useParams }                            from 'react-router-dom';
import SecurityListCard                         from '../components/SecurityListCard';
import SecurityDES                              from '../components/SecurityDESCard';
import { Col, Row, Space  }                     from 'antd';
import { getWatchlist, removeFromWatchlist }    from '../app/Crud.js';
import { _AVapikey_1, _AVapikey_2 }             from '../keys.js';
import axios                                    from 'axios';

const urlEndpointAlphaVantage = 'https://www.alphavantage.co/query?function=OVERVIEW';


export default function Watchlist () {

let [watchlist, setWatchlist] = useState([]);
let [companyOverview, setCompanyOverview] = useState({});
let { id } = useParams();

async function browseListFromUser() {
    let list = [];
    try {list = await getWatchlist(id);}
    catch (error) {console.log(error)};
    setWatchlist(list);
};

async function getSecurityOverview(value) {
try {
    // GET Request right below is sent to <alphavantage.co> @ 'SYMBOL_SEARCH' endpoint
    let response = await axios.get(`${urlEndpointAlphaVantage}&symbol=${value}&apikey=${_AVapikey_1}`);
    let overviewData = response.data;
    setCompanyOverview(overviewData);}
catch (error) {console.log(error)};
};

async function removeSecurity(ticker) {
try {
    let newList = await removeFromWatchlist(id, watchlist, ticker);
    setWatchlist(newList);
    setCompanyOverview({})}
catch (error) {console.log(error)};
};

useEffect(() => { console.log('effect ran'); browseListFromUser();}, [id])
console.log(watchlist);

return (
    <>
    <h2>I am the Watchlist page!</h2>
    {(!watchlist) && <p>You must log in to access your data dude!</p>}
    <Space direction='vertical' />
    <Row>
        <Col span={6} offset={1}>
        {id && <SecurityListCard style={{textAlign: 'left'}} watchlist={watchlist} getSecurityOverview={getSecurityOverview} />}
        </Col>
        <Col span={15} offset={1}>
        {(watchlist) && <SecurityDES companyOverview={companyOverview} removeSecurity={removeSecurity}/>}
        </Col>
    </Row>  
    </>);
};