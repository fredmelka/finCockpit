
import ColumnGroup from "antd/es/table/ColumnGroup";
import axios from "axios";

const _apiUrl = 'https://ironrest.fly.dev/api/';
const _collection = 'fredmelka-fincockpit';


async function getUser(username) {

    try {let response = await axios.get(`${_apiUrl}${_collection}/?owner=${username}`);
    let userObject = response.data;
    console.log(userObject);
    // Ironhack API is returning an array if GET requests are not made by 'Id'
    return userObject[0];
} 
catch (error) {console.log(error)};
if (Object.keys(userObject).length === 0) {console.log(`There is no such user. Check your input or Sign-up!`); return '';};
};


async function createUser(usernameToCreate) {

if (getUser(usernameToCreate) != '') {console.log(`User already exists`); return;};

try {let response = await axios.post(`${_apiUrl}${_collection}/`, {'owner': usernameToCreate, 'watchlist': []})
    console.log(response);
}
catch (error) {console.log(error)};
};


async function addToWatchlist(userId, ticker, companyName) {

try {
    let response = await axios.get(`${_apiUrl}${_collection}/${userId}`);
    let userObject = response.data;
    let { id, watchlist } = userObject;
    let newWatchlist = [...watchlist, {"ticker": ticker, "companyname": companyName}];
    let post = await axios.patch(`${_apiUrl}${_collection}/${userId}`, {"watchlist": newWatchlist});
    console.log('post?', post);
}
catch (error) {console.log(error)};
};


export { getUser, createUser, addToWatchlist };