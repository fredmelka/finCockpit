
import React from "react";
import { useState } from "react";
import SymbolLookup from "../components/SymbolLookup";

import { Button, Divider, Space } from 'antd';


export default function Securities () {

let [securitiesList, setSecuritiesList] = useState([]);
let [showLookupBar, setLookupBar] = useState(false); 

let updateMonitor = (array) => setSecuritiesList(array);

return (
    <>
    <Space direction='vertical' size='middle'>
        <h2>I am the Securities page!</h2>
    </Space>

    <Divider orientation='left'>
        <Button onClick={() => setLookupBar(!showLookupBar)}>
            {showLookupBar ? 'Hide' : 'Open'} Symbol Lookup
        </Button>
    </Divider>
    {showLookupBar && <SymbolLookup updateMonitor={updateMonitor} />}

    <div>
        {securitiesList.map((security) =>  <div>{(security)['1. symbol']}</div>)}
    </div>

    </>);
};