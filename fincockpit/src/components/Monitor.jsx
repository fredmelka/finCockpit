
import React                                    from "react";
import { useState, useEffect }                  from "react";
import axios                                    from 'axios';
import { Skeleton, Table, Tag }                 from 'antd';
import { addToWatchlist }                       from '../app/Crud.js';
import { _FinnhubToken_1, _FinnhubToken_2 }     from '../keys.js';

const urlFinnhubCompanyProfile2 = 'https://finnhub.io/api/v1/stock/profile2?symbol=';


export default function Monitor({securitiesList}) {

console.log(`Tickers to be fetched : ${securitiesList.join(' ')}`);

let [data, setData] = useState([]);

// Function that builds [dataSource] required to render the <Table> Component
async function getData() {
    let info = [];
    for (let i=0; i < securitiesList.length; i++) {
        try {
            let responseProfile2 = await axios.get(`${urlFinnhubCompanyProfile2}${securitiesList[i]}&token=${_FinnhubToken_1}`);
            let securityData = responseProfile2.data;
            if (Object.keys(securityData).length > 0) {securityData.key = i; info = [...info, securityData]};
        }
        catch (error) {console.log(error)};
    };
    setData(info);
};
    
useEffect(() => {getData()}, [securitiesList]);

// Setting of the [Columns] required to render the <Table> antd Component
const Columns = [
    {title: 'Ticker', dataIndex: 'ticker', key: 'ticker'},
    {title: 'Company Name', dataIndex: 'name', key: 'name'},
    {title: 'Industry', dataIndex: 'finnhubIndustry', key: 'finnhubIndustry'},
    {title: 'web', dataIndex: 'weburl', key: 'weburl'},
    {title: 'WatchList', dataIndex: 'action', key: 'watchlist', render: (_, record) => ( <Tag onClick={() => {addToWatchlist('64626285ed70adc2fc0fabb9', record.ticker, record.name)}}>{record.ticker}</Tag> )}
];

return (
    <>
    <Skeleton active loading={data.length === 0} title={false} paragraph={{rows: 2, width: 800}}>
        <Table dataSource={data} columns={Columns} />
    </Skeleton>
    </>);
};


// const urlFinnhubCompanyRecommendation = 'https://finnhub.io/api/v1/stock/recommendation?symbol=';

// Asynchronous function with potential concurrency of actions if the below API call is added
// let responseRecommendation = axios.get(`${urlFinnhubCompanyRecommendation}${securitiesList[i]}&token=${tokenFinnhub}`);
// let recommendation = (await responseRecommendation).data;
// let securityData = Object.assign(profileInfo, recommendation[0]);