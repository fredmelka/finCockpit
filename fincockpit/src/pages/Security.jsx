
import {useState, useEffect, useRef} from 'react';
import {useParams, useOutletContext, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Button, Card, Empty, Popover, Tabs} from 'antd';
import {useDimensions} from '../hooks/useDimensions.js';

import Description from '../components/Security.Description.jsx';
import Profile from '../components/Security.Profile.jsx';
import Fundamental from '../components/Security.Fundamental.jsx';
import Quote from '../components/Security.Quote.jsx';
import Returns from '../components/Security.Return.jsx';

import Test from '../components/Test.Developer.jsx';

import {_FMPapikey_1} from '../utils/Keys.js';

// API Endpoint COMPANY_PROFILE
const urlEndpointFMP_companyProfile = 'https://financialmodelingprep.com/api/v3/profile/';
// API Endpoint KEY_METRICS
const urlEndpointFMP_keyMetrics = 'https://financialmodelingprep.com/api/v3/key-metrics/';
// API Endpoint FULL_QUOTE
const urlEndpointFMP_quote = 'https://financialmodelingprep.com/api/v3/quote/';
// API Endpoint STOCK_PRICE_CHANGE
const urlEndpointFMP_priceReturn = 'https://financialmodelingprep.com/api/v3/stock-price-change/';

export default function Security () {

let {ticker} = useParams();
let removeSecurityFromWatchlist = useOutletContext();
let navigate = useNavigate();

let [security, setSecurity] = useState(null);
let [profile, setProfile] = useState({});
let [metrics, setMetrics] = useState({});
let [quote, setQuote] = useState({});
let [returns, setReturns] = useState({});

let componentRef = useRef(null);
let {width, height} = useDimensions(componentRef);

let getProfile = async (ticker) => {
try {
    let response = await axios.get(`${urlEndpointFMP_companyProfile}${ticker}?apikey=${_FMPapikey_1}`);
    let profileData = response.data[0]; setProfile(profileData);}
catch (error) {console.log(error);};
};
let getMetrics = async (ticker) => {
try {
    let response = await axios.get(`${urlEndpointFMP_keyMetrics}${ticker}?period=annual&apikey=${_FMPapikey_1}`);
    let metricsData = response.data[0]; setMetrics(metricsData);}
catch (error) {console.log(error);};
};
let getQuote = async (ticker) => {
try {
    let response = await axios.get(`${urlEndpointFMP_quote}${ticker}?apikey=${_FMPapikey_1}`);
    let quoteData = response.data[0]; setQuote(quoteData);}
catch (error) {console.log(error);};
};
let getReturns = async (ticker) => {
try {
    let response = await axios.get(`${urlEndpointFMP_priceReturn}${ticker}?apikey=${_FMPapikey_1}`);
    let returnsData = response.data[0]; setReturns(returnsData);}
catch (error) {console.log(error);};
};
let handleRemove = async () => {
    await removeSecurityFromWatchlist(security);
    setProfile({}); setSecurity();
    navigate('/watchlist');
};

useEffect(() => {setSecurity(ticker);}, [ticker]);
useEffect(() => {getProfile(ticker);}, [ticker]);
useEffect(() => {getMetrics(ticker);}, [ticker]);
useEffect(() => {getQuote(ticker);}, [ticker]);
useEffect(() => {getReturns(ticker);}, [ticker]);

let items = [
    {key: '1', label: 'Description', children: (<Description profile={profile} />)},
    {key: '2', label: 'Profile', children: (<Profile profile={profile} />)},
    {key: '3', label: 'Quote', children: (<Quote quote={quote} profile={profile} />)},
    {key: '4', label: 'Returns', children: (<Returns returns={returns} />)},
    {key: '5', label: 'Fundamentals', children: (<Fundamental metrics={metrics} profile={profile} />)},
    {key: '6', label: 'Graph', children: (<Test width={width} height={height} />)},
];

return (
    <>
    <Card
        bordered
        title={<Popover
            content={profile.description}
            placement='rightTop'
            title='Description'>
            {profile.companyName}</Popover>}
        extra={<Button size='small' type='primary' onClick={handleRemove}>Remove</Button>}
        style={{textAlign: 'left'}}>

    <div ref={componentRef}>
    {profile // to change HERE ***** WHAT TO CHANGE ?? => INVESTIGATE TO REMEMBER AND EVENTUALLY UPDATE !
        ? <Tabs defaultActiveKey='1' size='large' items={items} /*onChange={}*/ />
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />}
    </div>
    </Card>
    </>);
};