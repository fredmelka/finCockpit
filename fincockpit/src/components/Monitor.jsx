
import React                                    from 'react';
import { useState, useEffect }                  from 'react';
import axios                                    from 'axios';
import { Button, Rate, Skeleton, Table, Tag }   from 'antd';
import RatingStar                               from './RatingStar.jsx';
import { addToWatchlist }                       from '../app/Crud.js';
import { _FinnhubToken_1, _FinnhubToken_2 }     from '../keys.js';

// API Endpoint URL to retrieve basic Company_Profile (free access)
const urlFinnhubCompanyProfile2 = 'https://finnhub.io/api/v1/stock/profile2?symbol=';
// API Endpoint URL to retrieve Analysts Recommendations Summmary
const urlFinnhubCompanyRecommendation = 'https://finnhub.io/api/v1/stock/recommendation?symbol=';

export default function Monitor({securitiesList}) {

console.log(`Tickers to be fetched : ${securitiesList.join(' ')}`);

let [data, setData] = useState([]);

// Function that builds [dataSource] required to render the <Table> Component
async function getData() {
    let info = [];
    for (let i=0; i < securitiesList.length; i++) {
        try {
            let responseProfile2 = await axios.get(`${urlFinnhubCompanyProfile2}${securitiesList[i]}&token=${_FinnhubToken_1}`);
            let profile = responseProfile2.data;

            let responseRecommendation = await axios.get(`${urlFinnhubCompanyRecommendation}${securitiesList[i]}&token=${_FinnhubToken_2}`);            
            let lastReco = responseRecommendation.data[0];

            let securityData = Object.assign(profile, lastReco);
            console.log(securityData);
            if (Object.keys(securityData).length > 0) {securityData.key = i; info = [...info, securityData]};
        }
        catch (error) {console.log(error)};
    };
    setData(info);
};
    
useEffect(() => {getData()}, [securitiesList]);

// Setting of the [Columns] required to build the <Table> Component
const Columns = [
    {title: 'Ticker', dataIndex: 'ticker', key: 'ticker',
                    render: (_, record) => (<Tag color='geekblue-inverse'>{record.ticker}</Tag>)},

    {title: 'Company Name', dataIndex: 'name', key: 'name',
                    render: (_, record) => (<a href={record.weburl} target='_blank'>{record.name}</a>)},

    {title: 'Industry', dataIndex: 'finnhubIndustry', key: 'finnhubIndustry'},

    {title: 'Market Cap.', dataIndex: 'marketCapitalization', key: 'marketCapitalization',
                    render: (_, record) => (<span>{`${Math.floor(record.marketCapitalization / 10) / 100} Mds`}</span>)},

    {title: 'Recommendations', dataIndex: 'buy', key: 'buy',
                    render: (_, record) => (<RatingStar record={record}/>)},

    {title: 'WatchList', dataIndex: 'action', key: 'watchlist', align: 'center',
                    render: (_, record) => ( <Button size='small' onClick={() => {addToWatchlist('64626285ed70adc2fc0fabb9', record.ticker, record.name)}}>Add</Button> )}
];

return (
    <>
    <Skeleton active loading={data.length === 0} title={false} paragraph={{rows: 3, width: 800}}>
        <Table dataSource={data} columns={Columns} />
    </Skeleton>
    </>);
};