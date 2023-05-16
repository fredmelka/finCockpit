
import React                                from "react";
import { List, Skeleton, Tag }              from 'antd';


export default function ({watchlist}) {

return (
    <>
    <List   
            bordered
            itemLayout ='horizontal'
            header={<div><strong>My favorites</strong></div>}
            dataSource = {watchlist}
            renderItem = {(item, index) => (
                <List.Item> {<Tag color='geekblue-inverse'>{item.ticker}</Tag>}
                            {item.companyname}</List.Item>)}
            style = {{textAlign: 'left'}}
    />
    </>);
};