
import {Descriptions, Tag} from 'antd';
import Signer from './Security.Return.Signer';

export default function Quote ({quote, profile}) {

let {change, dayLow, dayHigh, earningsAnnouncement, open,
    marketCap, previousClose, price, priceAvg50, priceAvg200, volume} = quote;

let {beta} = profile;

let items = [
    {key: '1', label: 'Last price', span:2, children: (<><Tag color='geekblue'>{price}</Tag><Signer value={change} /></>)},
    {key: '2', label: 'Market capitalization', span:2, children: (<>{`${Math.floor(marketCap / 1e8) / 10} Mds`}</>)},
    {key: '3', label: 'High', children: (<>{dayHigh}</>)},
    {key: '4', label: 'Low', children: (<>{dayLow}</>)},
    {key: '5', label: 'Open', children: (<>{open}</>)},
    {key: '6', label: 'Prev.', children: (<>{previousClose}</>)},
    {key: '7', label: 'Day volume', span:4, children: (<>{`${volume} shares`}</>)},
    {key: '8', label: 'Beta', span:2, children: (<>{beta}</>)},
    {key: '9', label: '50d. Avg.', children: (<>{Math.floor(priceAvg50 * 100) / 100}</>)},
    {key: '10', label: '200d. Avg.', children: (<>{Math.floor(priceAvg200 * 100) / 100}</>)},
    {key: '11', label: 'Next Earnings Announcement', children: (<>{(new Date(earningsAnnouncement)).toDateString()}</>)}
];

return (
    <>
    <Descriptions style={{textAlign:'left'}} column={4} size='small' title='Trading' items={items} />
    </>);
};