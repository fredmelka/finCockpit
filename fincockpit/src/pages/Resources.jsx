
import {Collapse, Col} from 'antd';
import FAQs from '../data/Faq.json';

export default function Resources () {

let onChange = (key) => {console.log(key);};
const items = FAQs.map((item, index) => ({key: index, label: item.question, children: (<>{item.answer}</>)}));

return (
    <>
    <h2>I am the Resources page!</h2>
    <Col span={16} offset={2}>
    <Collapse items={items} size='small' onChange={onChange} style={{textAlign: 'left'}} ghost bordered={false} />
    </Col>
    </>);
};