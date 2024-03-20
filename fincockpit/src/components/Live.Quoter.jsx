
import {useEffect, useState} from 'react';
import {Statistic} from 'antd';

export default function Quoter ({value}) {

let [flash, setFlash] = useState(null);
let [previous, setPrevious] = useState(null);

let toggleFlash = () => {
    let threshold = 0.0025; // Variation threshold for triggering a flash between two quotes
    if ((value / previous) - 1 > threshold) {setFlash('up'); setPrevious(value);}
    else if ((previous / value) - 1 > threshold) {setFlash('down'); setPrevious(value);};
};

useEffect(toggleFlash, [value]);

return (
    <>
    <Statistic className={flash} precision={2} value={value} valueStyle={{fontSize: '1.2em'}} />
    </>);
};

