
import {Rate, Tooltip} from 'antd';

export default function Rating ({record}) {

let {strongBuy = 0, buy = 0, hold = 0, sell = 0, strongSell = 0} = record;
let reviews = {strongBuy, buy, hold, sell, strongSell};

let starify = (reviews) => {
    let points = {strongBuy: 5, buy: 3, hold: 1, sell: -1, strongSell: -2};
    let score = 0, countOfReviews = 0;
    for (let type in points) {score += points[type] * reviews[type]; countOfReviews += reviews[type];};
    return Math.round(10 * Math.max(0, score / (countOfReviews * Math.max(...Object.values(points))))) / 2;
};

let content = (
    <><span>
    {Object.entries(reviews).filter(([_, n]) => n > 0).map(([typeOfReview, n]) => `${n} ${typeOfReview}${n > 1 ? 's' : ''}`).join(', ')}
    </span></>);

return (
    <div>
    <Tooltip color='geekblue' title={content}>
    <><Rate allowHalf disabled defaultValue={starify(reviews)} /></>
    </Tooltip>
    </div>);
};