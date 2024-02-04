
import {Descriptions} from 'antd';

export default function SecurityMetrics ({metrics, profile}) {

let {calendarYear, date, debtToEquity, dividendYield, enterpriseValue, marketCap,
    netIncomePerShare, period, revenuePerShare, peRatio, roe, symbol} = metrics;

let {currency, lastDiv} = profile;

let items = [
    {key: '1', label: 'Period', span:4, children: (<>{`${calendarYear}-${period} as of ${date}:`}</>)},
    {key: '2', label: 'Market Capitalization', span:2, children: (<>{`${Math.floor(marketCap / 1e9)} Mds ${currency}`}</>)},
    {key: '3', label: 'Enterprise Value', span:2, children: (<>{`${Math.floor(enterpriseValue / 1e9)} Mds ${currency}`}</>)},
    {key: '4', label: 'Div. Yield', children: (<>{`${Math.floor(dividendYield * 10000) / 100}%`}</>)},
    {key: '5', label: 'Last', children: (<>{`${lastDiv} ${currency}  /s.`}</>)},
    {key: '6', label: 'Revenue', children: (<>{`${Math.floor(revenuePerShare * 100) / 100} /s.`}</>)},
    {key: '7', label: 'Income', children: (<>{`${Math.floor(netIncomePerShare * 100) / 100} /s.`}</>)},
    {key: '8', label: 'PE ratio', children: (<>{`${Math.floor(peRatio * 100) / 100}`}</>)},
    {key: '9', label: 'RoE', children: (<>{`${Math.floor(roe * 100) / 100}`}</>)},
    {key: '10', label: 'Debt to Equity ratio', span:2, children: (<>{`${Math.floor(debtToEquity * 100) / 100}`}</>)}
];

return (
    <>
    <Descriptions style={{textAlign:'left'}} column={4} size='small' title='Financial Metrics' items={items} />
    </>);
};