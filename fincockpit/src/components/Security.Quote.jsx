
import {Descriptions} from 'antd';

export default function SecurityQuote ({quote, profile}) {

let {change, changesPercentage, dayLow, dayHigh, earningsAnnouncement,
    open, marketCap, previousClose, price, priceAvg50, priceAvg200, volume} = quote;

let {beta} = profile;

let items = [
    {key: '1', label: 'Last', span:2, children: (<>{`${price} (${Math.floor(changesPercentage * 10) / 10}%)`}</>)},
    {key: '2', label: 'High', children: (<>{dayHigh}</>)},
    {key: '3', label: 'Low', children: (<>{dayLow}</>)},
    {key: '4', label: 'Open', children: (<>{open}</>)},
    {key: '5', label: 'Day Volume', span:2, children: (<>{`${volume} shares`}</>)},
    {key: '6', label: 'Market Capitalization', span:2, children: (<>{`${Math.floor(marketCap / 1e8) / 10} Mds`}</>)},
    {key: '7', label: 'Prev.', span: 2, children: (<>{previousClose}</>)},
    {key: '8', label: 'Beta', span:2, children: (<>{beta}</>)},
    {key: '9', label: '50d. Avg.', children: (<>{Math.floor(priceAvg50 * 100) / 100}</>)},
    {key: '10', label: '200d. Avg.', span:2, children: (<>{Math.floor(priceAvg200 * 100) / 100}</>)},
    {key: '11', label: 'Next Earnings Announcement', children: (<>{(new Date(earningsAnnouncement)).toDateString()}</>)}
];

return (
    <>
    <Descriptions style={{textAlign:'left'}} column={5} size='small' title='Trading' items={items} />
    </>);
};