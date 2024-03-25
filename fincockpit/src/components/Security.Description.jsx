
import {Tag, Typography} from 'antd';

export default function Description ({profile}) {

let {description, exchangeShortName, symbol, sector} = profile;
let {Text} = Typography;

return (
    <>
    <Tag color='geekblue-inverse'>{symbol}</Tag>
    <Tag color='black'>{exchangeShortName}</Tag>
    <Tag color='purple'>{sector}</Tag>
    <Text>{description}</Text> 
    </>);
};