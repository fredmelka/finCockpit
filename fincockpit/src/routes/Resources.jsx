
import React from 'react';
import {Collapse, Col} from 'antd';
import Faq from '../data/Faq.js';

export default function Resources () {

let {Panel} = Collapse;
let onChange = (key) => {console.log(key);};

return (
    <>
    <h2>I am the Resources page!</h2>
    <Col span={16} offset={4}>
        <Collapse defaultActiveKey={1} onChange={onChange}>
        {Faq.map((item, index) =>   <Panel header={item.question} key={index}>
                                    <p>{item.answer}</p>
                                    </Panel>
        )}
        </Collapse> 
    </Col>
    </>);
};