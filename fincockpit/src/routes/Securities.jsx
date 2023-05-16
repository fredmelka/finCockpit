
import React                                from "react";
import { useState }                         from "react";
import Monitor                              from "../components/Monitor";
import SymbolLookup                         from "../components/SymbolLookup";
import IndexLookup                          from "../components/IndexLookup";
import { Button, Col, Divider, Row, Space } from 'antd';


export default function Securities () {

let [securitiesList, setSecuritiesList]     = useState([]);
let [showLookupBar, setLookupBar]           = useState(false);
let [showStockList, setShowStockList]       = useState(false);

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

    <Row>
        <Col span={12}>
        {showLookupBar && <IndexLookup updateMonitor={updateMonitor} />}
        </Col>
        <Col span={12}>
        {showLookupBar && <SymbolLookup updateMonitor={updateMonitor} />}
        </Col>
    </Row>

    <Divider orientation='left'>
        <Button onClick={() => setShowStockList(!showStockList)}>
        {showStockList ? 'Hide' : 'Expand'} Monitor :{` ${securitiesList.length} securit${securitiesList.length > 1 ? 'ies' : 'y'}`}
        </Button>
    </Divider>

    <Space direction='vertical' size='middle'>
        {showStockList && <Monitor securitiesList={securitiesList} />}
    </Space>
    </>);
};