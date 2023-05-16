
import React                        from "react";
import { useState }                 from "react";
import axios                        from 'axios';
import { Input, Space }             from 'antd';
import { _AVapikey_1 }              from '../keys.js';

const urlEndpointAlphaVantage = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH';
// GET Request right below is sent to <alphavantage.co> @ 'SYMBOL_SEARCH' endpoint
// Data retrieved from the AlphaVantage request seat under a key named 'bestMatches' (array of objects)
// Array of symbols is collected here by grabbing the value of the key '1. symbol' of each object of the array

export default function SymbolLookup ({updateMonitor}) {

let { Search } = Input;
let [lookup, setLookup] = useState('');

let updateLookup = (event) => setLookup(event.target.value);

async function lookupSymbol (value) {
try {
    let response = await axios.get(`${urlEndpointAlphaVantage}&keywords=${value}&apikey=${_AVapikey_1}`);
    let symbols = response.data.bestMatches.map(equity => equity['1. symbol']);
    updateMonitor(symbols);
    setLookup('');}
catch (error) {console.log(error);};
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