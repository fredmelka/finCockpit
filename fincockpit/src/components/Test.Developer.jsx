
import {useState, useEffect} from 'react';
import {Line} from '@ant-design/charts';
import HistoTest from '../data/TestHistorical.json'; // TMP Hard Data
import {_FMPapikey_1} from '../utils/Keys.js';

// API Endpoint DAILY_CHART_EOD
const urlEndpointFMP_historicalPrice = 'https://financialmodelingprep.com/api/v3/historical-price-full/';

export default function Test ({width, height}) {

let [data, setData] = useState([]);
let dataToDisplay = (HistoTest.historical.slice(0, 57));

useEffect(() => {setData(dataToDisplay)}, []);

const config = {
    data: data.map((point) => ({...point, date: new Date(point.date)})),
    xField: 'date',
    yField: 'close',
    // point: {shapeField: 'square', sizeField: 2, colorField: 'navy'},
    style: {lineWidth: 2},
    width: width,
    height: 350
};

return (
    <>
    <>{width} x {height}</> 
    <Line {...config} />
    </>);
};