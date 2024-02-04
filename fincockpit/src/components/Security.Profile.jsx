
import {Descriptions} from 'antd';

export default function SecurityProfile ({profile}) {

let {address, ceo, city, country, exchangeShortName, fullTimeEmployees,
    isin, industry, state, symbol, sector} = profile;

let items = [
    {key: '1', label: 'Symbol', children: (<tag>{symbol}</tag>)},
    {key: '2', label: 'ISIN', children: (<tag>{isin}</tag>)},
    {key: '3', label: 'Exchange', children: (<tag>{exchangeShortName}</tag>)},
    {key: '4', label: 'Industry', span:2, children: (<>{industry}</>)},
    {key: '5', label: 'Sector', children: (<>{sector}</>)},
    {key: '6', label: 'CEO', span:2, children: (<>{ceo}</>)},
    {key: '7', label: 'Headcount', children: (<>{fullTimeEmployees}</>)},
    {key: '8', label: 'Address', span:3, children: (<>{`${address} - ${city}, ${state} (${country})`}</>)}
];

return (
    <>
    <Descriptions style={{textAlign:'left'}} column={3} size='small' title='Company profile' items={items} />
    </>);
};