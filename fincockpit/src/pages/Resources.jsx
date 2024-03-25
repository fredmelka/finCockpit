
import {Collapse, Col} from 'antd';
import FAQs from '../data/Faq.json';

export default function Resources () {

let onChange = (key) => {console.log(key);};
const items = FAQs.map((item, index) => ({key: index, label: item.question, children: (<p>{item.answer}</p>)}));

return (
    <>
    <h2>I am the Resources page!</h2>
    <Col span={16} offset={4}>
        <Collapse items={items} size='small' defaultActiveKey={1} onChange={onChange} style={{textAlign: 'left'}} />
    </Col>
    </>);
};