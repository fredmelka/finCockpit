
import React from "react";
import { useState } from "react";
import axios from 'axios';
import { Button, Input, Space } from 'antd';

const urlEndpointFinnhub = 'https://finnhub.io/api/v1/search?q=';
const tokenFinnhub = 'chdons9r01qk9rb2m89gchdons9r01qk9rb2m8a0';

export default function SymbolLookup ({}) {

let { Search } = Input;
let [lookup, setLookup] = useState('');

let updateLookup = (event) => setLookup(event.target.value);
console.log(lookup);

async function lookupSymbol (value) {
    try {
        let response = await axios.get(`${urlEndpointFinnhub}${value}&token=${tokenFinnhub}`);
        console.log(response.data);
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