
import {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Alert, Radio, Space} from 'antd';

export default function Securities () {

let navigate = useNavigate();
let [display, setDisplay] = useState(null);

return (
    <>
    <Space direction='vertical' size='middle'>
    <h2>I am the Securities page!</h2>
    {!display && <Alert type='info' message='Pick a browsing mode!' />}
    <Radio.Group buttonStyle='solid' size='large' onChange={(e) => {setDisplay(e.target.value); navigate(e.target.value);}} defaultValue={display}>
        <Radio.Button value='lookup'>Lookup</Radio.Button>
        <Radio.Button value='browser'>Browser</Radio.Button>
    </Radio.Group>
    </Space>
    <Outlet />
    </>);
};