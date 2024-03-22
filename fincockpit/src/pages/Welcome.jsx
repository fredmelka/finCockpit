
import {Flex, Space} from 'antd';
import LiveCryptoCurrencies from '../components/Live.Cryptocurrencies.jsx';
import LiveEquities from '../components/Live.Equities.jsx';

export default function Welcome () {

return (
    <>
    <Space style={{width:'100%'}} direction='vertical'>
    <Flex className='webName' justify='center'>
        <img className='logo' src='./assets/appicon.png' alt='finCockpit' />
        <h1><i>fin</i>Cockpit</h1>
    </Flex>
    <Flex style={{width:'100%'}} justify='space-evenly' wrap='wrap'>
        <LiveEquities />
        <LiveCryptoCurrencies />
    </Flex>
    </Space>
    </>);
};