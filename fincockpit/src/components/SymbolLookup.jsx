
import React from "react";
import { useState } from "react";

import { Button, Input, Space  } from 'antd';

export default function SymbolLookup ({}) {

let { Search } = Input;
let [lookup, setLookup] = useState();

let updateLookup = (event) => {setLookup(event.target.value)};
let ticker = '';

return (
    <>
    <Space direction='vertical'>
        <Search
            addonBefore='Symbol'
            allowClear
            type='text'
            placeholder='Ticker, Name, ISIN, CUSIP, etc.'
            onChange={updateLookup}
            onSearch={() => {}} />
    </Space>
    </>);
};