
import {useState, useEffect} from 'react';
import {Tag} from 'antd';
import {_FinnhubToken_1} from '../utils/Keys.js';

export default function LiveStocks () {

let [livePrice, setLivePrice] = useState();

const socket = new WebSocket(`wss://ws.finnhub.io?token=${_FinnhubToken_1}`);

let subscribe = () => {
    socket.addEventListener('open', function (event) {
        console.log('connecting!');
        socket.send(JSON.stringify({'type': 'subscribe', 'symbol': 'TSLA'}));
        socket.send(JSON.stringify({'type': 'subscribe', 'symbol': 'MSFT'}));
    });   
    socket.addEventListener('message', function (event) {
    // console.log(`Message from Finnhub server ${event.data}`);
        let message = JSON.parse(event.data);
        console.log('foe', message);
    // setLivePrice(message.data[0].p);
    });
};

let unsubscribe = () => {
    console.log('bye!', socket.readyState);
    if (socket.readyState > 0) {
        console.log('unsubscribe and close!');
        socket.send(JSON.stringify({'type': 'unsubscribe', 'symbol': 'TSLA'}));
        socket.send(JSON.stringify({'type': 'unsubscribe', 'symbol': 'MSFT'}));
        socket.close();
    };
};

useEffect(() => {subscribe(); return () => {unsubscribe();};}, []);

return (
    <>
    {/* <p>{security}</p> */}
    <Tag color='red'>Quote ? {livePrice}</Tag>
    </>);
};