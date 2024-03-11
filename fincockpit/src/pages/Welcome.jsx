
import React from 'react';
import {Flex, Space} from 'antd';
import LiveCryptoCurrencies from '../components/Live.Cryptocurrencies.jsx';

export default function Welcome () {

return (
    <>
    <main id='homepage'>
    <Space direction='vertical'>
    <Flex className='webName'>
        <img className='logo' src='./assets/appicon.png' alt='finCockpit' />
        <h1><i>fin</i>Cockpit</h1>
    </Flex>
    </Space>
    <LiveCryptoCurrencies />
    </main>
    </>);
};