
import axios from "axios";

const _apiUrl = 'https://ironrest.fly.dev/api/';
const _collection = 'fredmelka-fincockpit';


// function that GET the Object user = {_id, owner, watchlist} 
async function getUser(username) {
try {
    let response = await axios.get(`${_apiUrl}${_collection}/?owner=${username}`);
    let userObject = response.data;
    console.log(userObject);
    if (Object.keys(userObject).length === 0) {console.log(`User not found. Please check or sign-up.`); return '';};

    // Ironhack API is returning an array if the GET requests are not queried directly 'by id'
    return userObject[0];
} 
catch (error) {console.log(error)};
};


// function that POST a new Object user to the database collection
async function createUser(usernameToCreate) {
if (getUser(usernameToCreate) != '') {console.log(`Name ${usernameToCreate} already exists.`); return;};
try {
    let response = await axios.post(`${_apiUrl}${_collection}/`, {'owner': usernameToCreate, 'watchlist': []})
    console.log(response);
}
catch (error) {console.log(error)};
};


// function that GET the Array watchlist from the Object user
async function getWatchlist(userId) {
try {
    let response = await axios.get(`${_apiUrl}${_collection}/${userId}`);
    let { watchlist } = response.data;
    return watchlist;
}
catch (error) {console.log(error)};
};


// function that PATCH an Object favorite = {ticker, companyname} in the Array watchlist from the Object user
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


export { getUser, getWatchlist, createUser, addToWatchlist };