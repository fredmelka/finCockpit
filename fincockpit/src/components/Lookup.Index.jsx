
import {useState} from 'react';
import axios from 'axios';
import {Select, Space} from 'antd';
import {_FMPapikey_1} from '../utils/Keys.js';

// GET request to <financialmodelingprep.com> @ e.g. 'NASDAQ_CONSTITUENT' endpoint
const urlEndpointFMP = 'https://financialmodelingprep.com/api/v3/';

export default function IndexLookup ({updateMonitor}) {

let [lookup, setLookup] = useState('');
let updateLookup = (value) => {setLookup(value);};

let getIndexMembers = async (value) => {
try {
    let response = await axios.get(`${urlEndpointFMP}${value}?apikey=${_FMPapikey_1}`);
    let constituents = response.data.map(constituent => constituent.symbol);
    updateMonitor(constituents);
    setLookup('');}
catch (error) {console.log(error);};
};

// Array of underlyings to fetch constituents: e.g. NDX, DJI
const options = [
    {value: 'dowjones_constituent', label: 'Dow Jones Industrial Average Index (DJI)'},
    {value: 'nasdaq_constituent', label: 'Nasdaq 100 Index (NDX)'},
    {value: 'sp500_constituent', label: 'S&P 500 Index (SPX)', disabled: true},
    {value: 'stock_market/gainers', label: 'US Market Gainers (MOV+)'},
    {value: 'stock_market/losers', label: 'US Market Losers (MOV-)'}
];

return (
    <>
    <Space direction='vertical'>
    <Select
        style={{width: 300}}
        allowClear
        options={options}
        placeholder='Dow Jones, Nasdaq, etc.'
        onChange={updateLookup}
        onSelect={getIndexMembers} />
    </Space>
    </>);
};