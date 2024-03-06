
import {Descriptions, Tag} from 'antd';

export default function SecurityProfile ({profile}) {

let {address, ceo, city, country, exchangeShortName, fullTimeEmployees,
    isin, industry, state, symbol, sector} = profile;

let items = [
    {key: '1', label: 'Symbol', children: (<><Tag>{symbol}</Tag><Tag color='black'>{exchangeShortName}</Tag></>)},
    {key: '2', label: 'ISIN', children: (<Tag color='yellow'>{isin}</Tag>)},
    {key: '3', label: 'Industry', children: (<>{industry}</>)},
    {key: '4', label: 'Sector', children: (<>{sector}</>)},
    {key: '5', label: 'CEO', children: (<>{ceo}</>)},
    {key: '6', label: 'Headcount', children: (<>{fullTimeEmployees}</>)},
    {key: '7', label: 'Address', span:2, children: (<>{`${address} - ${city}, ${state} (${country})`}</>)}
];

return (
    <>
    <Descriptions style={{textAlign:'left'}} column={2} size='small' title='Company profile' items={items} />
    </>);
};