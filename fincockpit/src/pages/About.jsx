
import React from 'react';
import {Card, Space, Typography} from 'antd';

export default function About () {

let {Text} = Typography;

return (
    <>
    <Space direction='vertical'>
        <h2>I am the About page!</h2>
        <Card className='plastic' bordered title='the finCockpit Project'>
        <Text>The content of this page will soon be published by the web developer in charge, please be indulgent while it arrives!</Text>
        <br />
        <Text>Meanwhile, practise having plastic mindset like this card on this page! Cheers.</Text>
        </Card>
    </Space>
    </>);
};