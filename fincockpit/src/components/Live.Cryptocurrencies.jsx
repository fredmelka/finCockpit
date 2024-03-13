
import {useState, useEffect, useRef} from 'react';
import {Avatar, Switch, Table, Tag} from 'antd';
import cryptoCurrencies from '../data/Cryptos.json';

export default function LiveCryptoCurrencies () {

let [quotes, setQuotes] = useState({});
let [active, setActive] = useState(true);
let connection = useRef(null); if (connection.current === null) {connection.current = new WebSocket(`wss://ws.bitstamp.net`);};
let list = useRef(null); if (list.current === null) {list.current = cryptoCurrencies;};
// React approach to avoid reloading Ref contents (especially if expensive objects)

let subscribe = () => {
if (!active) {return;}; setQuotes({});
connection.current.onopen = (event) => {
for (let crypto of list.current) {
    let channel = {event: 'bts:subscribe', data: {channel: `live_trades_${crypto.pair}`}};
    connection.current.send(JSON.stringify(channel));};
console.log(`Connected to Websocket!`);
};
connection.current.onmessage = (event) => {
let message = JSON.parse(event.data); let newTrade = {};
if (message.data.price) {
    newTrade[message.channel.slice(message.channel.lastIndexOf('_') + 1 - message.channel.length)] = message.data.price;
    console.log(newTrade);
    setQuotes(quotes => ({...quotes, ...newTrade}));};
};
};

let unsubscribe = () => {
if (!active) {return;};
if (connection.current.readyState > 0) {console.log(`Disconnecting! status: ${connection.current.readyState}`);
    for (let crypto of list.current) {
        let channel = {event: 'bts:unsubscribe', data: {channel: `live_trades_${crypto.pair}`}};
        connection.current.send(JSON.stringify(channel));};
    connection.current.close(); connection.current = null;
};
};

useEffect(() => {subscribe(); return () => {unsubscribe();};}, [active]);

// Setting of the [columns] required to build the <Table> component
const columns = [
    {title: 'Crypto', dataIndex: 'crypto', key: 'crypto', align: 'left', width: 50,
                    render: (_, record) => (<Avatar src={record.img} />)},
    {title: 'Name', dataIndex: 'name', key: 'name',  width: 200,
                    render: (_, record) => (<><Tag color='lightgray'>{record.ticker}</Tag><a href={record.webUrl} target='_blank'>{record.name}</a></>)},
    {title: 'Last', dataIndex: 'trade', key: 'lastPrice', align: 'right', width: 100,
                    render: (_, record) => (record.price && <strong>{record.price} $</strong>)}                
];

let data = list.current.map(currency => {let key=currency.pair, price = quotes[currency.pair]; return {...currency, price, key}});

return (
    <>
    <Table
        dataSource={data}
        columns={columns}
        showHeader={false}
        pagination={false}
        footer={() => <div style={{textAlign:'right'}}><i>live update </i><Switch defaultChecked onChange={(checked) => {setActive(checked);}} /></div>}
        size='small' />
    </>);
};