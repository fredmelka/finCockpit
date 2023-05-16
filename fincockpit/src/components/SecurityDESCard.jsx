
import React                                from "react";
import { useState, useEffect }              from "react";
import axios                                from "axios";
import { Card, Space, Tag }                 from 'antd';


export default function SecurityDES({companyOverview}) {

return (
    <>
    <Space direction='vertical' size={10} />
    <Card 
        bordered
        title={companyOverview.Name}
        extra={<Tag>Remove</Tag>}
        headStyle={{textAlign: 'left'}}
        bodyStyle={{textAlign: 'left'}}>

        <p>{`Country : ${companyOverview.Country}`}</p>
        <p>{`Exhange : ${companyOverview.Exchange}`}</p>
        <p>{`Sector : ${companyOverview.Sector}`}</p>
        <p>{`Industry : ${companyOverview.Industry}`}</p>
        <p>{`MarketCapitalization : ${Math.floor(companyOverview.MarketCapitalization / 1000000)} Mds`}</p>
        <p>{`PE Ratio : ${companyOverview.PERatio}`}</p>
        <p>{`Dividend Yield : ${companyOverview.DividendYield}`}</p>
        <p>{`EPS : ${companyOverview.EPS}`}</p>
    </Card>
    </>
);
};