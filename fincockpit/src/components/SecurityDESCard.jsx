
import React from "react";
import { Button, Card, Descriptions, Space, Popover, Tag } from 'antd';


export default function SecurityDES({companyOverview, removeSecurity}) {

let { AnalystTargetPrice, Country, Currency, Description, DividendYield, EPS, Exchange, Industry,
    Name, Symbol, Sector, MarketCapitalization,  PERatio, ProfitMargin } = companyOverview;

return (
    <>
    <Space direction='vertical' />
    <Card 
        bordered
        title={<Popover
                    content={Description}
                    placement='rightTop'
                    title='Description'>
                {Name}</Popover>}

        extra={<Button type='primary' danger onClick={() => removeSecurity(Symbol)}>Remove</Button>}
        headStyle={{textAlign: 'left'}}
        bodyStyle={{textAlign: 'left'}}>

        <Descriptions column={3}>
            <Descriptions.Item label='Country'>{Country}</Descriptions.Item>
            <Descriptions.Item label='Exchange'>{Exchange}</Descriptions.Item>
            <Descriptions.Item label='Market Cap.'>{Currency ? `${Math.floor(MarketCapitalization / 1e9)} Mds ${Currency}` : ''}</Descriptions.Item>
            <Descriptions.Item label='Sector'><Tag>{Sector}</Tag></Descriptions.Item>
            <Descriptions.Item label='Industry' span={2}><Tag>{Industry}</Tag></Descriptions.Item>
            <Descriptions.Item label='PE Ratio'>{PERatio}</Descriptions.Item>
            <Descriptions.Item label='Dividend Yield'>{DividendYield ? `${Math.floor(DividendYield * 10000) / 100}%` : ''}</Descriptions.Item>
            <Descriptions.Item label='EPS'>{EPS}</Descriptions.Item>
            <Descriptions.Item label='Profit Margin'>{ProfitMargin ? `${Math.floor(ProfitMargin * 10000) / 100}%` : ''}</Descriptions.Item>
            <Descriptions.Item label='Analyst Target' span={2}>{AnalystTargetPrice}</Descriptions.Item>
            <Descriptions.Item label='52week High' span={1}>{companyOverview['52WeekHigh']}</Descriptions.Item>
            <Descriptions.Item label='52week Low' span={2}>{companyOverview['52WeekLow']}</Descriptions.Item>
            <Descriptions.Item label='50d Mov. Avg.' span={1}>{companyOverview['50DayMovingAverage']}</Descriptions.Item>
            <Descriptions.Item label='200d Mov. Avg.' span={2}>{companyOverview['200DayMovingAverage']}</Descriptions.Item>
        </Descriptions>
    </Card>
    </>);
};