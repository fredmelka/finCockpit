
import React, {useState} from 'react';
import axios from 'axios';
import {Input, Space} from 'antd';
import {_FinnhubToken_1} from '../utils/Keys.js';

// GET request to <finnhub.io> @ 'SYMBOL_LOOKUP' endpoint
const urlEndpointFinnhub = 'https://finnhub.io/api/v1/index/constituents?symbol=';

export default function IndexLookup ({updateMonitor}) {

let [lookup, setLookup] = useState('');
let {Search} = Input;

let updateLookup = (event) => setLookup(event.target.value);

let getIndexMembers = async (value) => {
try {

    let response = await axios.get(`${urlEndpointFinnhub}${value}&token=${_FinnhubToken_1}`);
    // Data retrieved from the finnhub request is under key 'bestMatches' (array of objects)
    updateMonitor(response.data.constituents);
    setLookup('');}
catch (error) {console.log(error);};
};

return (
    <>
    <Space direction='vertical'>
        <Search
            addonBefore='Index'
            allowClear
            type='text'
            value={lookup}
            placeholder='Dow Jones, S&P500, Nasdaq, etc.'
            enterButton
            onChange={updateLookup}
            onSearch={getIndexMembers}/>
    </Space>
    </>);
};