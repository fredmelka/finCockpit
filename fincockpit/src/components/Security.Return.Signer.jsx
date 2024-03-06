
import {useState, useEffect} from 'react';
import {Tag} from 'antd';

export default function Signer ({value}) {

let [sign, setSign] = useState();
let toggleSign = () => value > 0 ? setSign(true) : setSign(false);

useEffect(toggleSign, [value]);

return (
    <>
    {sign
    ? <Tag color='green'>{Math.floor(value * 10) / 10}</Tag>
    : <Tag color='red'>{Math.floor(value * 10) / 10}</Tag>}
    </>);
};