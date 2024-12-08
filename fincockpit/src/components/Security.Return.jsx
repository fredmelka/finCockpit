
import {Descriptions} from 'antd';
import Signer from './Security.Return.Signer.jsx';

export default function Returns ({returns}) {

delete returns.symbol; // Deleting Symbol key from props to avoid its display
let items = [], key = 0;
for (let change in returns) {items.push({key, label: change, children: (<><Signer value={returns[change]} /></>)}); key++;};

return (
    <>
    <Descriptions style={{textAlign:'left'}} column={4} size='small' title='Price Returns' items={items} />
    </>);
};