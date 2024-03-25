
import {useState} from 'react';
import axios from 'axios';
import {Input, Space} from 'antd';
import {_AVapikey_1, _AVapikey_2} from '../utils/Keys.js';

// API Endpoint SYMBOL_SEARCH
const urlEndpointAlphaVantage = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH';
// Data retrieved seat under a property named 'bestMatches' which is an array of objects
// Array of symbols is collected here by grabbing the value of the key '1. symbol' of each object of the array

export default function SymbolLookup ({updateMonitor}) {

let {Search} = Input;
let [lookup, setLookup] = useState('');

let updateLookup = (event) => setLookup(event.target.value);

let lookupSymbol = async (value) => {
try {
    let response = await axios.get(`${urlEndpointAlphaVantage}&keywords=${value}&apikey=${_AVapikey_1}`);
    console.log(response);
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