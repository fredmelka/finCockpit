
import React from 'react';
import { Card, Space, Typography } from 'antd'

export default function About () {

let { Text } = Typography;

return (
    <>
    <main id='homepage'>
    <Space direction='vertical'>
        <h2>I am the About page!</h2>
        <Card id='iamplastic' bordered title='the finCockpit Project'>
        <Text>Though the content of this page will soon be depolyed by the web developer in charge, please be indulgent while it arrives!</Text>
        <br />
        <Text>Meanwhile, please have a plastic mind like this card! Cheers.</Text>
        </Card>
    </Space>
    </main>
    </>);
};