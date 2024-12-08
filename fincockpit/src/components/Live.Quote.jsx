
import {useState, useEffect, useRef} from 'react';
import {Statistic} from 'antd';

export default function Quote ({value, precision = 2}) {

let [flash, setFlash] = useState(null);
let [previous, setPrevious] = useState(null);
let componentRef = useRef(null);

let toggleFlash = () => {
    let threshold = 0.001; // Variation Threshold for flashing
    if ((value / previous) > (1 + threshold)) {setFlash('up'); setPrevious(value);}
    else if ((value / previous) < (1 - threshold)) {setFlash('down'); setPrevious(value);};
};

let handleAnimation = () => {setFlash(null);};

useEffect(() => {let element = componentRef.current; element.onanimationend = handleAnimation; return () => {element.onanimationend = null;};}, []);
useEffect(toggleFlash, [value]);

return (
    <>
    <div ref={componentRef} className={flash}>
    <Statistic precision={precision} value={value} valueStyle={{fontSize: '1.2em'}} />
    </div>
    </>);
};

/*** Default Props
 * React Component may receive default props to be used through Component's property 'defaultProps'
 * Example ----> Quote.defaultProps = {precision: 2};
 * Property will be soon deprecated in next major release
 * Prefer default JavaScript parameters */