
import {useState, useEffect, useRef} from 'react';
import {Avatar, Switch, Table, Tag} from 'antd';
import equities from '../data/BlueChips.json';
import {_FinnhubToken_1} from '../utils/Keys.js';

// API WebSocket Finnhub
const urlWebSocket_Trades = `wss://ws.finnhub.io?token=${_FinnhubToken_1}`;

export default function LiveBlueChips () {

let [quotes, setQuotes] = useState({});
let [hold, setHold] = useState(false);
// React useRef() approach to avoid reloading Ref contents (especially if expensive objects)
let connection = useRef(null); if (connection.current === null) {connection.current = new WebSocket(urlWebSocket_Trades);};
let list = useRef(null); if (list.current === null) {list.current = equities;};

let subscribe = () => {
if (hold) {return;};
setQuotes({});
connection.current.onopen = (event) => {
for (let equity of list.current) {connection.current.send(JSON.stringify({type: 'subscribe', symbol: equity.ticker}));};
console.log(`Connected to Websocket! readyState: ${connection.current.readyState}`);
};
connection.current.onmessage = (event) => {
let message = JSON.parse(event.data); let newTrade = {}; console.log('message', message);
if (message.data) {
    newTrade[message.data.s] = message.data.p;
    setQuotes(quotes => ({...quotes, ...newTrade})); console.log(newTrade);};
};
};

let unsubscribe = () => {
if (hold) {return;};
if (connection.current.readyState > 0) {console.log(`Disconnecting! readyState: ${connection.current.readyState}`);
    for (let equity of list.current) {connection.current.send(JSON.stringify({type: 'unsubscribe', symbol: equity.ticker}));};
    connection.current.close(); connection.current = null;};
};

useEffect(() => {subscribe(); return () => {unsubscribe();};}, [hold]);

const columns = [
    {title: 'Ticker', dataIndex: 'equity', key: 'equity', align: 'left', width: 50,
                    render: (_, record) => (<Avatar src={record.img} />)},
    {title: 'Company', dataIndex: 'name', key: 'name',  width: 250,
                    render: (_, record) => (<><Tag color='lightgray'>{record.ticker}</Tag><a href={record.webUrl} target='_blank'>{record.name}</a></>)},
    {title: 'Last', dataIndex: 'trade', key: 'lastPrice', align: 'right', width: 100,
                    render: (_, record) => (record.price && <strong>{record.price} $</strong>)}                
];

let data = list.current.map(equity => {let key=equity.ticker, price = quotes[equity.ticker]; return {...equity, price, key}});

return (
    <>
    <Table dataSource={data} columns={columns} showHeader={false} pagination={false} size='small'
        footer={() => <div style={{textAlign:'left'}}><Switch defaultChecked onChange={(checked) => {setHold(!checked);}} /><i> live update </i></div>} />
    </>);
};