
import axios from "axios";

const _apiUrl = 'https://ironrest.fly.dev/api/';
const _collection = 'fredmelka-fincockpit';


// function that GET the Object user = {_id, owner, watchlist} 
async function getUser (username) {
try {
    let response = await axios.get(`${_apiUrl}${_collection}/?owner=${username}`);
    let userObject = response.data[0];
    console.log(userObject);
    if (!userObject) {console.log(`User not found. Please check or sign-up.`); return '';};

    // Ironhack API is returning an array if the GET requests are not queried directly 'by id'
    return userObject;
} 
catch (error) {console.log(error)};
};


// function that POST a new Object user to the database collection
async function createUser (usernameToCreate) {
try {
    if (await getUser(usernameToCreate) !== '') {console.log(`Name ${usernameToCreate} already exists.`); return;};
    let response = await axios.post(`${_apiUrl}${_collection}/`, {'owner': usernameToCreate, 'watchlist': []})
    console.log(response);
    return response.data.insertedId;
}
catch (error) {console.log(error)};
};


// function that GET the Array watchlist from the Object user
async function getWatchlist (userId) {
try {
    let response = await axios.get(`${_apiUrl}${_collection}/${userId}`);
    let { watchlist } = response.data;
    return watchlist;
}
catch (error) {console.log(error)};
};


// function that PATCH an Object favorite = {ticker, companyname} in the Array watchlist from the Object user
async function addToWatchlist (userId, ticker, companyName) {
try {
    let response = await axios.get(`${_apiUrl}${_collection}/${userId}`);
    let userObject = response.data;
    let { id, watchlist } = userObject;
    let newWatchlist = [...watchlist, {"ticker": ticker, "companyname": companyName}];
    let patch = await axios.patch(`${_apiUrl}${_collection}/${userId}`, {"watchlist": newWatchlist});
    console.log('post?', patch);
}
catch (error) {console.log(error)};
};


// function that PATCH a new Array watchlist from the user Object in order to remove one favorite = {ticker, companyname} 
async function removeFromWatchlist (userId, watchlist, ticker) {
try {
    let newWatchlist = watchlist.filter((security) => security.ticker !== ticker);
    let patch = await axios.patch(`${_apiUrl}${_collection}/${userId}`, {"watchlist": newWatchlist});
    console.log('delete?', patch);
    return newWatchlist;
}
catch (error) {console.log(error)};
};

export { getUser, getWatchlist, createUser, addToWatchlist, removeFromWatchlist };