
import axios from 'axios';

const _apiUrl = 'https://ironrest.fly.dev/api/';
const _collection = 'fredmelka-fincockpit';

// function that GET the Object user = {_id, owner, watchlist} 
async function getUser (username) {
try {
    let response = await axios.get(`${_apiUrl}${_collection}/?owner=${username}`);
    let userObject = response.data[0]; // Ironhack API is returning an array when GET requests are not queried directly 'by id'
    if (userObject) {console.log(`Welcome ${userObject.owner} (${userObject._id})`);}
    else {console.log(`User not found. Please check or sign-up.`); return;};
    return userObject;
}
catch (error) {console.log(error)};
};

// function that POST a new Object user to the database collection
async function createUser (usernameToCreate) {
if (await getUser(usernameToCreate)) {console.log(`Name ${usernameToCreate} already exists.`); return;};
try {
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
if (!userId) {console.log('no post since there is no user logged on!'); return;}; //avoid bug of adding a stock while not logged on
try {
    let response = await axios.get(`${_apiUrl}${_collection}/${userId}`);
    let userObject = response.data;
    let { id, watchlist } = userObject;
    
    let isNewItemOrDouble = watchlist.find((security) => security.ticker === ticker) === undefined ?  true : false;
    console.log(isNewItemOrDouble);
    if (!isNewItemOrDouble) {console.log('no post since this ticker already exists in the watchlist!'); return;};

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

export {getUser, getWatchlist, createUser, addToWatchlist, removeFromWatchlist};