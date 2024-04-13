
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Button, Divider, message, Radio, Select, Space, Table, Tag} from 'antd';
import {AuthContext} from '../context/Auth.context.jsx';
import {addToWatchlist} from '../utils/Crud.js';
import {_FMPapikey_1} from '../utils/Keys.js';

// API Endpoint SCREENER_STOCK
const urlEndpointFMP_historicalPrice = 'https://financialmodelingprep.com/api/v3/stock-screener';

export default function Browser () {

let {userId} = useContext(AuthContext);
let [data, setData] = useState([]);
let [dataToDisplay, setDataToDisplay] = useState([]);
let [sectorFilter, setSectorFilter] = useState([]);
let [exchangeFilter, setExchangeFilter] = useState([]);
let [typeFilter, setTypeFilter] = useState(undefined);

let [messageApi, contextHolder] = message.useMessage();
let messagePop = (type, value) => messageApi.open({type: type, content: value});

let getData = async () => {
try {let response = await axios.get(`${urlEndpointFMP_historicalPrice}?apikey=${_FMPapikey_1}`);
    let data = response.data.map((security, index) => ({...security, key: index}));
    setData(data); setDataToDisplay(data);}
catch (error) {console.log(error);};
};

let handleFilter = () => {
    let dataToFilter = [...data];
    if (sectorFilter.length > 0) {dataToFilter = dataToFilter.filter((security) => sectorFilter.includes(security.sector));};
    if (exchangeFilter.length > 0) {dataToFilter = dataToFilter.filter((security) => exchangeFilter.includes(security.exchangeShortName));};
    if (typeFilter !== undefined) {dataToFilter = dataToFilter.filter((security) => security.isFund === typeFilter);};
    setDataToDisplay(dataToFilter);
};

const sectorOptions = [
    {label: 'Basic Materials', value: 'Basic Materials'},
    {label: 'Consumer Cyclical', value: 'Consumer Cyclical'},
    {label: 'Consumer Defensive', value: 'Consumer Defensive'},
    {label: 'Communication Services', value: 'Communication Services'},
    {label: 'Energy', value: 'Energy'},
    {label: 'Healthcare', value: 'Healthcare'},
    {label: 'Financial Services', value: 'Financial Services'},
    {label: 'Industrials', value: 'Industrials'},
    {label: 'Real Estate', value: 'Real Estate'},
    {label: 'Technology', value: 'Technology'},
    {label: 'Utilities', value: 'Utilities'}
];

const exchangeOptions = [
    {label: 'NASDAQ', value: 'NASDAQ'},
    {label: 'AMEX', value: 'AMEX'},
    {label: 'NYSE', value: 'NYSE'},
    {label: 'EURONEXT', value: 'EURONEXT'},
    {label: 'TSX', value: 'TSX'},
    {label: 'ETF', value: 'ETF'}
];

const columns = [
    {title: 'Ticker', dataIndex: 'symbol', key: 'symbol', align: 'left', width: 50,
        render: (_, record) => (<><Tag color='geekblue-inverse'>{record.symbol}</Tag></>)},
    {title: 'Name', dataIndex: 'name', key: 'name', width: 300,
        render: (_, record) => (<><strong>{record.companyName.length > 35 ? `${record.companyName.slice(0, 32)}...` : record.companyName}</strong></>)},
    {title: 'Industry', dataIndex: 'industry', key: 'industry', width: 250,
        render: (_, record) => (<>{record.industry}</>),
        sorter: (a,b) => a.industry > b.industry ? 1 : -1},
    {title: 'Market Cap.', dataIndex: 'marketCapitalization', key: 'marketCapitalization', align: 'right', width: 150,
        render: (_, record) => (<span>{`${Math.floor(record.marketCap / 100000000) / 10} Mds`}</span>),
        sorter: (a,b) => a.marketCap - b.marketCap},
    {title: 'Last', dataIndex: 'trade', key: 'lastPrice', align: 'right', width: 100,
        render: (_, record) => (<>{record.price}</>)},
    {title: 'Beta', dataIndex: 'beta', key: 'beta', align: 'right', width: 70,
        render: (_, record) => (<>{record.beta}</>),
        sorter: (a,b) => a.beta - b.beta},
    {title: 'Yield', dataIndex: 'divYield', key: 'divYield', align: 'right', width: 70,
        render: (_, record) => (<>{Math.floor(1000 * record.lastAnnualDividend / record.price) / 10}</>),
        sorter: (a,b) => (a.lastAnnualDividend / a.price)  - (b.lastAnnualDividend / b.price)},
    {title: 'WatchList', dataIndex: 'action', key: 'watchlist', align: 'center',
        render: (_, record) => (<Button type='dashed' danger size='small' onClick={() => {addToWatchlist(userId, record.symbol, record.companyName); messagePop('info', `Adding ${record.companyName} in Watchlist!`)}}>Add</Button>)}
];

useEffect(() => {getData()}, []);
useEffect(handleFilter, [sectorFilter, exchangeFilter, typeFilter]);

return (
    <>
    {contextHolder}
    <Space direction='vertical'>
    <Divider>
    <Space>
    <Select mode='multiple' allowClear placeholder='Pick Sectors' onChange={setSectorFilter} options={sectorOptions} style={{width: 400, textAlign: 'left'}}/>
        <Select mode='multiple' allowClear placeholder='Pick Exchanges' onChange={setExchangeFilter} options={exchangeOptions} style={{width: 300, textAlign: 'left'}}/>
        <Radio.Group onChange={(e) => {setTypeFilter(e.target.value)}} defaultValue={typeFilter}>
            <Radio.Button value={undefined}>All</Radio.Button>
            <Radio.Button value={false}>Stocks</Radio.Button>
            <Radio.Button value={true}>Funds</Radio.Button>
        </Radio.Group>
    </Space>
    </Divider>
    <Table dataSource={dataToDisplay} columns={columns} size='small' />
    </Space>
    </>);
};