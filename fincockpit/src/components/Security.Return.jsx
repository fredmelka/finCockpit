
import {Descriptions} from 'antd';
import Signer from './Security.Return.Signer.jsx';

export default function Returns ({returns}) {

delete returns.symbol; // Deleting Symbol key from props to avoid its display
let items = []; let i = 0;
for (let change in returns) {
    i++;
    items.push({key: i.toString(), label: change, children: (<><Signer value={returns[change]} /></>)});
};

return (
    <>
    <Descriptions style={{textAlign:'left'}} column={4} size='small' title='Price Returns' items={items} />
    </>);
};