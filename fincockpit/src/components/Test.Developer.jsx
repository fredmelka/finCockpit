
import {useState, useEffect, useRef} from 'react';
import {Avatar, Switch, Table, Tag} from 'antd';
import Quote from './Live.Quote.jsx';
import equities from '../data/BlueChips.json';
import {_FinnhubToken_1} from '../utils/Keys.js';

// API WebSocket Finnhub
const urlWebSocket_Trades = `wss://ws.finnhub.io?token=${_FinnhubToken_1}`;

export default function Test () {

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
let message = JSON.parse(event.data); let newTrade = {};
if (message.type === 'trade') {
    for (let trade of message.data) {newTrade[trade.s] = Math.floor(100 * trade.p) / 100;};
    console.log(message.data.length + ' trades', newTrade);
    setQuotes(quotes => ({...quotes, ...newTrade}));};
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
        render: (_, record) => (<><Tag color='geekblue-inverse'>{record.ticker}</Tag><a href={record.webUrl} target='_blank'>{record.name}</a></>)},
    {title: 'Last', dataIndex: 'trade', key: 'lastPrice', align: 'right', width: 100,
        render: (_, record) => (record.price && <Quote value={record.price} />)}
];

let data = list.current.map(equity => {let key=equity.ticker, price = quotes[equity.ticker]; return {...equity, price, key}});

return (
    <>
    <Table dataSource={data} columns={columns} showHeader={false} pagination={false} size='small'
        footer={() => <div style={{textAlign:'right'}}><i>live update </i><Switch defaultChecked onChange={(checked) => {setHold(!checked);}} /></div>} />
    </>);
};