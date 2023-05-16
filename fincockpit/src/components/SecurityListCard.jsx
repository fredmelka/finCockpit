
import React                from "react";
import { List, Tag }        from 'antd';


export default function ({watchlist, getSecurityOverview}) {

return (
    <>
    <List   
            bordered
            itemLayout ='horizontal'
            header={<div><strong>My favorites</strong></div>}
            dataSource = {watchlist}
            renderItem = {(item, index) => (
                <List.Item> {<Tag key={index} onClick={() => getSecurityOverview(item.ticker)} color='geekblue-inverse'>{item.ticker}</Tag>}
                            {item.companyname}</List.Item>)}
            style = {{textAlign: 'left'}}
    />
    </>);
};