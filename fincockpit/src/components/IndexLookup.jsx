
import React                        from "react";
import { useState }                 from "react";
import axios                        from 'axios';
import { Input, Space }             from 'antd';
import { _FinnhubToken_1 }          from '../keys.js';

const urlEndpointFinnhub = 'https://finnhub.io/api/v1/index/constituents?symbol=';


export default function IndexLookup ({updateMonitor}) {

let { Search } = Input;
let [lookup, setLookup] = useState('');

let updateLookup = (event) => setLookup(event.target.value);

async function getIndexMembers (value) {
try {
    // GET Request right below is sent to <finnhub.io> @ the 'Symbol_lookup' endpoint
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
            onSearch={getIndexMembers} />
    </Space>
    </>);
};
