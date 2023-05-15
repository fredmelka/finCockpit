
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Divider, Space, Row  } from "antd";
import { getWatchlist } from '../app/Crud'


export default function Watchlist () {

let [watchlist, setWatchlist] = useState([]);
let { id } = useParams();

async function browseListFromUser() {
let list = [];
try {
    list = await getWatchlist(id);}
catch (error) {console.log(error)};

setWatchlist(list);
};

// browseListFromUser(id);
useEffect(() => { console.log('effect ran'); browseListFromUser();}, [id])

return (
    <>
    <h2>I am the Watchlist page!</h2>
    <Space direction='vertical' />  
    {id && watchlist.map(security =>  <p key={security.ticker}>{security.ticker}</p>)}
    </>);
};