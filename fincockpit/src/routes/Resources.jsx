
import React from 'react';
import FAQ from '../../content/FAQ.js';
import { Collapse, Col } from 'antd';

export default function Resources () {

let { Panel } = Collapse;

let onChange = (key) => {console.log(key);};

return (
    <>
    <h2>I am the Resources page!</h2>
    <Col span={16} offset={4}>
        <Collapse defaultActiveKey={1} onChange={onChange}>
        {FAQ.map((item, index) =>   <Panel header={item.question} key={index}>
                                    <p>{item.answer}</p>
                                    </Panel>
        )}
        </Collapse> 
    </Col>
    </>);
};