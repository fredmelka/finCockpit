
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Button, message, Skeleton, Table, Tag} from 'antd';
import RatingStar from './RatingStar.jsx';
import {AuthContext} from '../context/Auth.context.jsx';
import {addToWatchlist} from '../utils/Crud.js';
import {_FinnhubToken_1, _FinnhubToken_2} from '../utils/Keys.js';

// API Endpoint Company_Profile_2
const urlFinnhubCompanyProfile2 = 'https://finnhub.io/api/v1/stock/profile2?symbol=';
// API Endpoint Recommendation_Trends
const urlFinnhubCompanyRecommendation = 'https://finnhub.io/api/v1/stock/recommendation?symbol=';

export default function Monitor({securitiesList}) {

console.log(`Tickers to be fetched : ${securitiesList.join(' ')}`);

let {userId} = useContext(AuthContext);
let [data, setData] = useState([]);

let [messageApi, contextHolder] = message.useMessage();
let messagePop = (type, value) => messageApi.open({type: type, content: value});

// Function that builds [dataSource] required to render the <Table> Component
let getData = async () => {
    let info = [];
    messagePop('loading', 'Loading data, please wait!');
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
    messagePop('success', 'Data retrieved!');
};
    
useEffect(() => {getData()}, [securitiesList]);

// Setting of the [Columns] required to build the <Table> Component
const Columns = [
    {title: 'Ticker', dataIndex: 'ticker', key: 'ticker',
                    render: (_, record) => (<Tag color='geekblue-inverse'>{record.ticker}</Tag>)},

    {title: 'Company Name', dataIndex: 'name', key: 'name',
                    render: (_, record) => (<a href={record.weburl} target='_blank'>{record.name}</a>),
                    sorter: (a,b) => a.name > b.name ? 1 : -1},

    {title: 'Industry', dataIndex: 'finnhubIndustry', key: 'finnhubIndustry',
                    sorter: (a,b) => a.finnhubIndustry > b.finnhubIndustry ? 1 : -1},

    {title: 'Market Cap.', dataIndex: 'marketCapitalization', key: 'marketCapitalization',
                    render: (_, record) => (<span>{`${Math.floor(record.marketCapitalization / 10) / 100} Mds`}</span>),
                    sorter: (a,b) => a.marketCapitalization - b.marketCapitalization},

    {title: 'Recommendations', dataIndex: 'buy', key: 'buy',
                    render: (_, record) => (<RatingStar record={record}/>)},

    {title: 'WatchList', dataIndex: 'action', key: 'watchlist', align: 'center',
                    render: (_, record) => (<Button size='small'
                                                    onClick={() => {addToWatchlist(userId, record.ticker, record.name); messagePop('info', `Adding ${record.name} in Watchlist!`)}}>
                                                    Add
                                            </Button>)}
];

return (
    <>
    {contextHolder}
    <Skeleton active loading={data.length === 0} title={false} paragraph={{rows: 3, width: 800}}>
        <Table dataSource={data} columns={Columns}/>
    </Skeleton>
    </>);
};