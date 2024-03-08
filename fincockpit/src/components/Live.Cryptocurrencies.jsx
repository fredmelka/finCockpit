
import {useState, useEffect, useRef} from 'react';
import {Avatar, List, Tag} from 'antd';
import cryptoCurrencies from '../data/Cryptos.json';

export default function LiveCryptocurrencies () {

let [quotes, setQuotes] = useState({});
let connection = useRef(new WebSocket(`wss://ws.bitstamp.net`));
let list = useRef(cryptoCurrencies);

let subscribe = () => {
connection.current.onopen = (event) => {
for (let crypto of list.current) {
    let channel = {event: 'bts:subscribe', data: {channel: `live_trades_${crypto.currencyPair}`}};
    connection.current.send(JSON.stringify(channel));};
};   
connection.current.onmessage = (event) => {
let message = JSON.parse(event.data);
let currencyUpdate = {};
if (message.data.price) {
    currencyUpdate[message.channel.slice(message.channel.lastIndexOf('_') + 1 - message.channel.length)] = message.data.price;
    setQuotes(quotes => ({...quotes, ...currencyUpdate}));};
};
};

let unsubscribe = () => {
if (connection.current.readyState > 0) {
console.log('Disconnecting!', connection.current.readyState);
for (let crypto of list.current) {
    let channel = {event: 'bts:unsubscribe', data: {channel: `live_trades_${crypto.currencyPair}`}};
    connection.current.send(JSON.stringify(channel));};
connection.current.close();
};
};

useEffect(() => {subscribe(); return () => {unsubscribe();};}, []);

let data = list.current.map(currency => {let price = quotes[currency.currencyPair]; return {...currency, price}});

return (
    <>
    <List
        size = 'small'
        itemLayout ='horizontal'
        header = {<strong>Crypto assets</strong>}
        dataSource = {data}
        renderItem = {(item, index) => (
            <List.Item key={index}> <Avatar src={item.img} /> <Tag color='lightgray'>{item.ticker}</Tag> {item.name} <strong>{item.price}</strong></List.Item>)}
        style = {{textAlign: 'left'}} />
    </>);
};