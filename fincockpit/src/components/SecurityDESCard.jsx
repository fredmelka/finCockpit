
import React                                from "react";
import { useState, useEffect }              from "react";
import axios                                from "axios";
import { Card, Space, Popover, Tag }                 from 'antd';


export default function SecurityDES({companyOverview}) {

let {Name, Description, Country, Exchange, Sector, Industry, MarketCapitalization, Currency, PERatio, DividendYield, EPS } = companyOverview;

return (
    <>
    <Space direction='vertical'  />
    <Card 
        bordered
        size='small'
        title={<Popover
                    style={{width: '300px'}}
                    content={Description}
                    placement='rightTop'
                    title='Description'
                    trigger='click'>
                {Name}</Popover>}

        extra={<Tag>Remove</Tag>}
        headStyle={{textAlign: 'left'}}
        bodyStyle={{textAlign: 'left'}}>

        <p><strong>Country : </strong>{Country}</p>
        <p><strong>Exchange : </strong>{Exchange}</p>
        <p><strong>Sector : </strong>{Sector}</p>
        <p><strong>Market Cap. : </strong>{Currency != '' ? `${Math.floor(MarketCapitalization / 1000000) / 1000} Mds ${Currency}` : ''}</p>
        <p><strong>PE Ratio : </strong>{PERatio}</p>
        <p><strong>Dividend Yield : </strong>{DividendYield != '' ? `${Math.floor(DividendYield * 10000) / 100} %` : ''}</p>
        <p><strong>EPS : </strong>{EPS}</p>
    </Card>
    </>
);
};