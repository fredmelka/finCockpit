
import axios from "axios";

const _apiUrl = 'https://ironrest.fly.dev/api/';
const _collection = 'fredmelka-fincockpit';


async function getUser(username) {
let userObject = {};
try {let response = await axios.get(`${_apiUrl}${_collection}/?owner=${username}`);
    userObject = response.data;
    console.log(userObject)}
catch (error) {console.log(error)};
if (Object.keys(userObject).length === 0) {console.log(`There is no such user. Check your input or Sign-up!`); return '';};
return userObject; 
};


async function createUser(usernameToCreate) {
if (getUser(usernameToCreate) != '') {console.log(`User already exists`); return;};

try {let response = await axios.post(`${_apiUrl}${_collection}/`, {'owner': usernameToCreate, 'watchlist': []})
    console.log(response);}
catch (error) {console.log(error)};
};


async function addToWatchlist(username, ticker, companyName) {

if (getUser(username) === '') {console.log(`You must sign in first`); return;};

let {id, name, currentWatchList } = getUser(username);

let newWatchlist = [...currentWatchList, [ticker, companyName]];

try {let response = await axios.patch(`${_apiUrl}${_collection}/${id}`, newWatchlist)
    console.log(response);}
catch (error) {console.log(error)};
};



export { getUser, createUser, addToWatchlist };