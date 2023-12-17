
import React from 'react';
import {Rate, Tooltip} from 'antd';

export default function Rating ({record}) {

let {strongBuy, buy, hold, sell, strongSell} = record;

let recordRecos = [strongBuy, buy, hold, sell, strongSell];

let stars = (array) => {
    let factors = [5, 3, 1, -1, -2];
    let cleanrecos = array.map(value => (value) ? value : 0);
    let score = cleanrecos.reduce((a, c, index) => a + c * factors[index], 0);
    let countOfReviews = cleanrecos.reduce((a, c) => a + c, 0);
return Math.round(10 * Math.max(0, score / (countOfReviews * Math.max(...factors)))) / 2;};

const content = (<>
    {strongBuy > 0 ? <span>{`${strongBuy} strong buy `}</span> : ''}
    {buy > 0 ? <span>{`${buy} buy `}</span> : ''}
    {hold > 0 ? <span>{`${hold} hold `}</span> : ''}
    {sell > 0 ? <span>{`${sell} sell `}</span> : ''}
    {strongSell > 0 ? <span>{`& ${strongSell} strong sell.`}</span> : ''}
    </>);

return (
    <div>
    <Tooltip color='geekblue' title={content}>
    <>
    <Rate allowHalf disabled defaultValue={stars(recordRecos)} />
    </>
    </Tooltip>
    </div>);
};