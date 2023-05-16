
import React                                from "react";
import { List, Skeleton, Tag }              from 'antd';


export default function ({watchlist}) {

const data = watchlist;

console.log(watchlist);

return (
    <>
    <List   itemLayout ='horizontal'
            header={<div><strong>My favorites</strong></div>}
            dataSource = {data}
            renderItem = {(item, index) => (
                <List.Item> {<Tag color='geekblue-inverse'>{item.ticker}</Tag>}
                            {item.companyname}</List.Item>)}
    />
    </>);
};