
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {List, Tag} from 'antd';

export default function WatchedList ({watchlist}) {

let navigate= useNavigate();

return (
    <>
    <List
        bordered
        itemLayout ='horizontal'
        header={<div><strong>My favorites</strong></div>}
        dataSource = {watchlist}
        renderItem = {(item, index) => (
            <List.Item> {<Tag key={index} onClick={() => navigate(item.ticker)} color='geekblue-inverse'>{item.ticker}</Tag>}
            {item.companyname}</List.Item>)}
        style = {{textAlign: 'left'}} />
    </>);
};