
import {useState, useEffect} from 'react';

const socket = new WebSocket(`wss://ws.bitstamp.net`); console.log(socket);

export default function LiveCryptocurrencies () {

let [livePrice, setLivePrice] = useState({});

// console.log(livePrice);

let subscribe = () => {
    socket.addEventListener('open', function (event) {
        console.log('connecting!');
        socket.send(JSON.stringify({'event': 'bts:subscribe', 'data': {'channel': 'live_trades_btcusd'}}));
        socket.send(JSON.stringify({'event': 'bts:subscribe', 'data': {'channel': 'live_trades_ethusd'}}));
        socket.send(JSON.stringify({'event': 'bts:subscribe', 'data': {'channel': 'live_trades_usdtusd'}}));
        socket.send(JSON.stringify({'event': 'bts:subscribe', 'data': {'channel': 'live_trades_usdcusd'}}));
        socket.send(JSON.stringify({'event': 'bts:subscribe', 'data': {'channel': 'live_trades_xrpusd'}}));    
        socket.send(JSON.stringify({'event': 'bts:subscribe', 'data': {'channel': 'live_trades_adausd'}}));    
        socket.send(JSON.stringify({'event': 'bts:subscribe', 'data': {'channel': 'live_trades_solusd'}}));
    });   
    socket.addEventListener('message', function (event) {
        let message = JSON.parse(event.data);
        // console.log('foe', message);
        console.log(`Traded! ${message.channel.slice(message.channel.lastIndexOf('_') + 1 - message.channel.length)} @ ${message.data.price}`);
        // setLivePrice(message.data.price);
        let securityUpdate = {};
        securityUpdate[message.channel.slice(message.channel.lastIndexOf('_') + 1 - message.channel.length)] = message.data.price;
        setLivePrice(livePrice => ({...livePrice, ...securityUpdate}));
    });
};

let unsubscribe = () => {
    console.log('bye!', socket.readyState);
    if (socket.readyState > 0) {
        console.log('unsubscribe and close!');
        socket.send(JSON.stringify({'event': 'bts:unsubscribe', 'data': {'channel': 'live_trades_btcusd'}}));
        socket.send(JSON.stringify({'event': 'bts:unsubscribe', 'data': {'channel': 'live_trades_ethusd'}}));
        socket.send(JSON.stringify({'event': 'bts:unsubscribe', 'data': {'channel': 'live_trades_usdtusd'}}));
        socket.send(JSON.stringify({'event': 'bts:unsubscribe', 'data': {'channel': 'live_trades_usdcusd'}}));
        socket.send(JSON.stringify({'event': 'bts:unsubscribe', 'data': {'channel': 'live_trades_xrpusd'}}));
        socket.send(JSON.stringify({'event': 'bts:unsubscribe', 'data': {'channel': 'live_trades_adausd'}}));
        socket.send(JSON.stringify({'event': 'bts:unsubscribe', 'data': {'channel': 'live_trades_solusd'}}));
        socket.close();
    };
};

useEffect(() => {console.log('effect ran!'); subscribe(); return () => {unsubscribe();};}, []);

// console.log(livePrice);

return (
    <>
    {Object.entries(livePrice).map(security => (<p key={security}>{security[0]} ? <strong>{security[1]}</strong></p>))}
    {/* <p>Quote ? <strong>{livePrice}</strong></p> */}
    </>);
};