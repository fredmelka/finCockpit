
import React                                from "react";
import { useState, useEffect }              from "react";
import { useParams }                        from "react-router-dom";
import SecurityListCard                     from "../components/SecurityListCard";
import SecurityDES                          from "../components/SecurityDESCard";
import { Card, Col, Row, Space  }           from "antd";
import { getWatchlist }                     from '../app/Crud'

import axios                                from "axios";

const urlEndpointAlphaVantage = 'https://www.alphavantage.co/query?function=OVERVIEW';
const apikeyAlphaVantage = 'H7OMN7DX1WTKYADM';

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
        console.log(value);
        // GET Request right below is sent to <alphavantage.co> @ 'SYMBOL_SEARCH' endpoint
        let response = await axios.get(`${urlEndpointAlphaVantage}&symbol=${value}&apikey=${apikeyAlphaVantage}`);
        let overviewData = response.data;
        setCompanyOverview(overviewData);
    }
    catch (error) {console.log(error)};
    };

useEffect(() => { console.log('effect ran'); browseListFromUser();}, [id])

console.log(watchlist);

return (
    <>
    <h2>I am the Watchlist page!</h2>
    <Space direction='vertical' />
    <Row>
        <Col span={6} offset={1}>
        {id && <SecurityListCard style={{textAlign: 'left'}} watchlist={watchlist} getSecurityOverview={getSecurityOverview} />}
        </Col>
        <Col span={15} offset={1}>
            <SecurityDES companyOverview={companyOverview} />
        </Col>
    </Row>  
    </>);
};