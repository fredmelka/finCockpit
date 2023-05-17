
import React                        from 'react';
import { useNavigate }              from 'react-router-dom';
import { Divider, Tag, Typography } from 'antd';


export default function Footer () {

const  { Text } = Typography;

let navigate = useNavigate();
let goBack = () => {navigate(-1)};
let goForward = () => {navigate(+1)};
let goHome = () => {navigate('/')}

return (
    <footer>
    <Divider>
        <Tag onClick={goBack}>Back</Tag>
        <Text onClick={goHome} code >Web development ahead | Coders currently at work.</Text>
        <Tag onClick={goForward}>Forward</Tag>
    </Divider>
    </footer>);
};