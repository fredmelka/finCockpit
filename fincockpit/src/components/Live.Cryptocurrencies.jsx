
import {useState, useEffect, useRef} from 'react';
import {Avatar, Switch, Table, Tag} from 'antd';
import Quote from '../components/Live.Quote.jsx';
import cryptoCurrencies from '../data/Cryptos.json';

// API WebSocket Bitstamp
const urlWebSocket_cryptoCurrencies = 'wss://ws.bitstamp.net';

export default function LiveCryptoCurrencies () {

let [quotes, setQuotes] = useState({});
let [hold, setHold] = useState(false);
// React useRef() approach to avoid reloading Ref contents (especially if expensive objects)
let connection = useRef(null); if (connection.current === null) {connection.current = new WebSocket(urlWebSocket_cryptoCurrencies);};
let list = useRef(null); if (list.current === null) {list.current = cryptoCurrencies;};

let subscribe = () => {
if (hold) {return;};
setQuotes({});
connection.current.onopen = (event) => {
for (let crypto of list.current) {
    let channel = {event: 'bts:subscribe', data: {channel: `live_trades_${crypto.pair}`}};
    connection.current.send(JSON.stringify(channel));};
console.log(`Connected to Websocket! readyState: ${connection.current.readyState}`);
};
connection.current.onmessage = (event) => {
let message = JSON.parse(event.data); let newTrade = {};
if (message.data.price) {
    newTrade[message.channel.slice(message.channel.lastIndexOf('_') + 1 - message.channel.length)] = message.data.price;
    setQuotes(quotes => ({...quotes, ...newTrade})); console.log(newTrade);};
};
};

let unsubscribe = () => {
if (hold) {return;};
if (connection.current.readyState > 0) {console.log(`Disconnecting! readyState: ${connection.current.readyState}`);
    for (let crypto of list.current) {
        let channel = {event: 'bts:unsubscribe', data: {channel: `live_trades_${crypto.pair}`}};
        connection.current.send(JSON.stringify(channel));};
    connection.current.close(); connection.current = null;
};
};

useEffect(() => {subscribe(); return () => {unsubscribe();};}, [hold]);

const columns = [
    {title: 'Crypto', dataIndex: 'crypto', key: 'crypto', align: 'left', width: 50,
                    render: (_, record) => (<Avatar src={record.img} />)},
    {title: 'Name', dataIndex: 'name', key: 'name',  width: 200,
                    render: (_, record) => (<><Tag color='#5b8c00'>{record.ticker}</Tag><a href={record.webUrl} target='_blank'>{record.name}</a></>)},
    {title: 'Last', dataIndex: 'trade', key: 'lastPrice', align: 'right', width: 100,
                    render: (_, record) => (record.price && <Quote value={record.price} />)}            
];

let data = list.current.map(currency => {let key=currency.pair, price = quotes[currency.pair]; return {...currency, price, key}});

return (
    <>
    <Table dataSource={data} columns={columns} showHeader={false} pagination={false} size='small'
        footer={() => <div style={{textAlign:'right'}}><i>live </i><Switch defaultChecked onChange={(checked) => {setHold(!checked);}} /></div>} />
    </>);
};