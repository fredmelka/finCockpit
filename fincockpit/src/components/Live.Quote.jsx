
import {useState, useEffect, useRef} from 'react';
import {Statistic} from 'antd';

export default function Quote ({value}) {

let [flash, setFlash] = useState(null);
let [previous, setPrevious] = useState(null);
let componentRef = useRef(null);

let toggleFlash = () => {
    let threshold = 1.001; // Variation Threshold
    if ((value / previous) > threshold) {setFlash('up'); setPrevious(value);}
    else if ((previous / value) > threshold) {setFlash('down'); setPrevious(value);};
};
let handleAnimation = () => {setFlash(null);};

useEffect(() => {
    let element = componentRef.current; element.onanimationend = handleAnimation;
    return () => {element.onanimationend = null;};
}, []);

useEffect(toggleFlash, [value]);

return (
    <>
    <div ref={componentRef} className={flash}>
    <Statistic precision={2} value={value} valueStyle={{fontSize: '1.2em'}} />
    </div>
    </>);
};