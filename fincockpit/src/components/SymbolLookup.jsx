
import React from "react";
import { useState } from "react";
import axios from 'axios';
import { Input, Space } from 'antd';

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
        // GET Request right below is sent to <finnhub.io> @ the 'Symbol_lookup' endpoint
        // let response = await axios.get(`${urlEndpointFinnhub}${value}&token=${tokenFinnhub}`);

        // GET Request right below is sent to <alphavantage.co> @ the 'Ticker_search' endpoint
        let response = await axios.get(`${urlEndpointAlphaVantage}&keywords=${value}&apikey=${apikeyAlphaVantage}`);

        // Data retrieved from the AlphaVantage request seat under the key 'bestMatches' (array of objects)
        // Array of symbols is collected here by grabbing the value of the key '1. symbol' of each object of the array
        let symbols = response.data.bestMatches.map(equity => equity['1. symbol']);

        updateMonitor(symbols);
        setLookup('');}
    
    catch (error) {console.warn(error);};
};

return (
    <>
    <Space direction='vertical'>
        <Search
            addonBefore='Symbol'
            allowClear
            type='text'
            value={lookup}
            placeholder='Ticker, Name, CUSIP, etc.'
            enterButton
            onChange={updateLookup}
            onSearch={lookupSymbol} />
    </Space>
    </>);
};