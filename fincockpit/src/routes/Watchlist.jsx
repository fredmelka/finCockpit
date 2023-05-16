
import React                                from "react";
import { useState, useEffect }              from "react";
import { useParams }                        from "react-router-dom";
import SecurityListCard                     from "../components/SecurityListCard";
import { Col, Space, Row  }        from "antd";
import { getWatchlist }                     from '../app/Crud'


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

useEffect(() => { console.log('effect ran'); browseListFromUser();}, [id])

console.log(watchlist);

return (
    <>
    <h2>I am the Watchlist page!</h2>
    <Space direction='vertical' />
    <Row>
        <Col span={6} offset={1}>
        {id && <SecurityListCard style={{textAlign: 'left'}} watchlist={watchlist} />}
        </Col>
    </Row>  
    </>);
};