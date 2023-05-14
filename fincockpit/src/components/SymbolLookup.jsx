
import React from "react";
import { useState } from "react";
import axios from 'axios';
import { Button, Input, Space } from 'antd';

const urlEndpointFinnhub = 'https://finnhub.io/api/v1/search?q=';
const tokenFinnhub = 'chdons9r01qk9rb2m89gchdons9r01qk9rb2m8a0';
const urlEndpointAlphaVantage = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH';
const apikeyAlphaVantage = 'H7OMN7DX1WTKYADM';


export default function SymbolLookup ({updateMonitor}) {

let { Search } = Input;
let [lookup, setLookup] = useState('');

let updateLookup = (event) => setLookup(event.target.value);

async function lookupSymbol (value) {
    try {
        // Request here below is passed on to finnhub.io symbol lookup endpoint
        // let response = await axios.get(`${urlEndpointFinnhub}${value}&token=${tokenFinnhub}`);

        // Request here below is passed on to alphavantage.co ticker search endpoint
        let response = await axios.get(`${urlEndpointAlphaVantage}&keywords=${value}&apikey=${apikeyAlphaVantage}`);
        console.log(response.data);
        // Data retrieved from the AlphaVantage request is under key 'bestMatches' (array of objects)
        updateMonitor(response.data.bestMatches);
        setLookup('');
    } catch (error) {
        console.warn(error);};
};

return (
    <>
    <Space direction='vertical'>
        <Search
            addonBefore='Symbol'
            allowClear
            type='text'
            value={lookup}
            placeholder='Ticker, Name, ISIN, CUSIP, etc.'
            onChange={updateLookup}
            onSearch={lookupSymbol} />
    </Space>
    </>);
};