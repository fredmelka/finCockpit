
import React                                from "react";
import { Card, Space, Popover, Tag }        from 'antd';


export default function SecurityDES({companyOverview, removeSecurity}) {

let {Name, Symbol, Description, Country, Exchange, Sector, MarketCapitalization, Currency, PERatio, DividendYield, EPS } = companyOverview;

return (
    <>
    <Space direction='vertical' />
    <Card 
        bordered
        size='small'
        title={<Popover
                    content={Description}
                    placement='rightTop'
                    title='Description'
                    trigger='click'>
                {Name}</Popover>}

        extra={<Tag onClick={() => removeSecurity(Symbol)}>Remove</Tag>}
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
    </>);
};