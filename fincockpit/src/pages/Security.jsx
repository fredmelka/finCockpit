
import {useState, useEffect, useRef} from 'react';
import {useParams, useOutletContext, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Button, Card, Popover, Tag} from 'antd';
import {useDimensions} from '../hooks/useDimensions.js';

import Description from '../components/Security.Description.jsx';
import Profile from '../components/Security.Profile.jsx';
import Quote from '../components/Security.Quote.jsx';
import Returns from '../components/Security.Return.jsx';
import Fundamental from '../components/Security.Fundamental.jsx';
import Chart from '../components/Security.Chart.jsx';

import {_FMPapikey_1} from '../utils/Keys.js';

// API Endpoint COMPANY_PROFILE
const urlEndpointFMP_companyProfile = 'https://financialmodelingprep.com/api/v3/profile/';
// API Endpoint KEY_METRICS
const urlEndpointFMP_keyMetrics = 'https://financialmodelingprep.com/api/v3/key-metrics/';
// API Endpoint FULL_QUOTE
const urlEndpointFMP_quote = 'https://financialmodelingprep.com/api/v3/quote/';
// API Endpoint STOCK_PRICE_CHANGE
const urlEndpointFMP_priceReturn = 'https://financialmodelingprep.com/api/v3/stock-price-change/';
// API Endpoint DAILY_CHART_EOD
const urlEndpointFMP_historicalPrice = 'https://financialmodelingprep.com/api/v3/historical-price-full/';

export default function Security () {

let {ticker} = useParams();
let removeSecurityFromWatchlist = useOutletContext();
let navigate = useNavigate();

let [security, setSecurity] = useState(null);
let [profile, setProfile] = useState({});
let [metrics, setMetrics] = useState({});
let [quote, setQuote] = useState({});
let [returns, setReturns] = useState({});
let [timeSerie, setTimeSerie] = useState([]);

let [activeTab, setActiveTab] = useState(0);
let handleTabChange = (key) => {setActiveTab(key);};

let componentRef = useRef(null);
let {width, height} = useDimensions(componentRef);

let getProfile = async (ticker) => {
try {let response = await axios.get(`${urlEndpointFMP_companyProfile}${ticker}?apikey=${_FMPapikey_1}`);
    let profileData = response.data[0]; setProfile(profileData);}
catch (error) {console.log(error);};
};
let getMetrics = async (ticker) => {
try {let response = await axios.get(`${urlEndpointFMP_keyMetrics}${ticker}?period=annual&apikey=${_FMPapikey_1}`);
    let metricsData = response.data[0]; setMetrics(metricsData);}
catch (error) {console.log(error);};
};
let getQuote = async (ticker) => {
try {let response = await axios.get(`${urlEndpointFMP_quote}${ticker}?apikey=${_FMPapikey_1}`);
    let quoteData = response.data[0]; setQuote(quoteData);}
catch (error) {console.log(error);};
};
let getReturns = async (ticker) => {
try {let response = await axios.get(`${urlEndpointFMP_priceReturn}${ticker}?apikey=${_FMPapikey_1}`);
    let returnsData = response.data[0]; setReturns(returnsData);}
catch (error) {console.log(error);};
};
let getTimeSerie = async (ticker) => {
try {let response = await axios.get(`${urlEndpointFMP_historicalPrice}${ticker}?apikey=${_FMPapikey_1}&from=2000-01-01`);
    let timeSerieData = response.data.historical; setTimeSerie(timeSerieData);}
catch (error) {console.log(error);};
};

let handleRemove = async () => {
    await removeSecurityFromWatchlist(security);
    setProfile({}); setSecurity(); navigate('/watchlist');
};

useEffect(() => {setSecurity(ticker);}, [ticker]);
useEffect(() => {getProfile(ticker);}, [ticker]);
useEffect(() => {getMetrics(ticker);}, [ticker]);
useEffect(() => {getQuote(ticker);}, [ticker]);
useEffect(() => {getReturns(ticker);}, [ticker]);
useEffect(() => {getTimeSerie(ticker);}, [ticker]);

const tabs = [
    {key: 0, label: 'Description'},
    {key: 1, label: 'Profile'},
    {key: 2, label: 'Quote'},
    {key: 3, label: 'Returns'},
    {key: 4, label: 'Fundamentals'},
    {key: 5, label: 'Graph'}
];

const content = {
    0: (<Description profile={profile} />),
    1: (<Profile profile={profile} />),
    2: (<Quote quote={quote} profile={profile} />),
    3: (<Returns returns={returns} />),
    4: (<Fundamental metrics={metrics} profile={profile} />),
    5: (<div ref={componentRef}><Chart timeSerie={timeSerie} width={width} height={height} /></div>)
};

return (
    <>
    <Card
        title={<Popover content={<Tag color='geekblue-inverse'>{profile.symbol}</Tag>} placement='rightTop' title='Coming Live Chart'>{profile.companyName}</Popover>}
        extra={<Button size='small' type='primary' onClick={handleRemove}>Remove</Button>}
        style={{textAlign: 'left'}}
        tabList={tabs}
        activeTabKey={activeTab}
        onTabChange={handleTabChange}>
    {profile && content[activeTab]}
    </Card>
    </>);
};