
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Button, message, Skeleton, Table, Tag} from 'antd';
import RatingStar from './RatingStar.jsx';
import {AuthContext} from '../context/Auth.context.jsx';
import {addToWatchlist} from '../utils/Crud.js';
import {_FinnhubToken_1, _FinnhubToken_2} from '../utils/Keys.js';

// API Endpoint COMPANY_PROFILE_2
const urlFinnhub_CompanyProfile2 = 'https://finnhub.io/api/v1/stock/profile2?symbol=';
// API Endpoint RECOMMENDATION_TRENDS
const urlFinnhub_CompanyRecommendation = 'https://finnhub.io/api/v1/stock/recommendation?symbol=';

export default function Monitor({securitiesList}) {

console.log(`Tickers to be fetched : ${securitiesList.join(' ')}`);

let {userId} = useContext(AuthContext);
let [data, setData] = useState([]);

let [messageApi, contextHolder] = message.useMessage();
let messagePop = (type, value) => messageApi.open({type: type, content: value});

let getData = async () => {
    let info = [];
    messagePop('loading', 'Loading data, please wait!');
    for (let i = 0; i < securitiesList.length; i++) {
    try {
        let responseProfile2 = await axios.get(`${urlFinnhub_CompanyProfile2}${securitiesList[i]}&token=${_FinnhubToken_1}`);
        let profile = responseProfile2.data;
        let responseRecommendation = await axios.get(`${urlFinnhub_CompanyRecommendation}${securitiesList[i]}&token=${_FinnhubToken_2}`);            
        let lastReco = responseRecommendation.data[0];

        let securityData = Object.assign(profile, lastReco); console.log(securityData);
        if (Object.keys(securityData).length > 0) {securityData.key = i; info = [...info, securityData]};
    }
    catch (error) {console.log(error)};
    };
    setData(info);
    messagePop('success', 'Data retrieved!');
};

useEffect(() => {getData()}, [securitiesList]);

const columns = [
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
        <Table dataSource={data} columns={columns} />
    </Skeleton>
    </>);
};