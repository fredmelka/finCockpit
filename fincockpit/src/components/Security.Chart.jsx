
import {useState} from 'react';
import {Select, Space} from 'antd';
import {Line} from '@ant-design/charts';
import {_FMPapikey_1} from '../utils/Keys.js';

export default function Chart ({timeSerie, width, height}) {

let [dataToDisplay, setDataToDisplay] = useState(null);

let handleChart = (value) => {let data = timeSerie.map((point) => ({...point, date: new Date(point.date)}));
    let currentDate = new Date();
    switch (value) {
    // THREE MONTHS Trailing - DAILY Frequency
    case 0:
    currentDate.setMonth(currentDate.getMonth() - 3);
    setDataToDisplay(data.slice(0, data.findIndex(point => point.date < currentDate))); break;
    // YEAR-TO-DATE Trailing - DAILY Frequency
    case 1:
    {let currentYear = currentDate.getFullYear();
    setDataToDisplay(data.filter(point => point.date.getFullYear() === currentYear));}; break;
    // TWELVE MONTHS Trailing - DAILY Frequency
    case 2:
    currentDate.setMonth(currentDate.getMonth() - 12);
    setDataToDisplay(data.slice(0, data.findIndex(point => point.date < currentDate))); break;
    // FIVE YEARS Trailing - WEEKLY Frequency
    case 3:
    currentDate.setFullYear(currentDate.getFullYear() - 5);
    setDataToDisplay([data[0], ...data
        .slice(0, data.findIndex(point => point.date < currentDate))
        .filter((point, index) => index > 0 && point.date.getDay() > data[index - 1].date.getDay())]); break;
    // MAXIMUM Data available - MONTHLY Frequency
    case 4:
    setDataToDisplay([data[0], ...data
        .filter((point, index) => index > 0 && point.date.getDate() > data[index - 1].date.getDate())]); break;
    // FULL Timeserie DEFAULTING case
    default: setDataToDisplay([]);
    };
};

const chartTypes = [
    {value: 0, label: 'Line 3 months daily'},
    {value: 1, label: 'Line Year-to-Date daily'},
    {value: 2, label: 'Line 12 months daily'},
    {value: 3, label: 'Line 5 years weekly'},
    {value: 4, label: 'Line maximum monthly'},
    {value: 5, label: 'Candles 12 months daily', disabled: true},
    {value: 6, label: 'Candles 5 years daily', disabled: true}
];

const chartConfig = {
    data: dataToDisplay,
    xField: 'date',
    yField: 'close',
    colorField: '#12934f',
    style: {lineWidth: 2},
    width: width || 700,
    height: 350,
    tooltip: {title: (point) => `${new Date(point.date).toDateString()} @ ${point.close}`, items: false},
    scale: {x: {type: 'time', tickCount: 10, mask: 'MMM-YYYY'}, y: {tickCount: 10}},
    label: {selector: 'first', text: (d) => d.close, dx: -25, dy: 25, textAlign: 'right', style: {fontSize: 10}}
};

return (
    <>
    <Space direction='vertical'>
    <Space>
    <Select placeholder={'Chart Type'} options={chartTypes} onChange={handleChart} style={{textAlign: 'left', width: 250}} />
    <i>{width} ✖️ {height}</i>
    </Space>
    {dataToDisplay && <Line {...chartConfig} />}
    </Space>
    </>);
};