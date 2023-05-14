
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Skeleton, Space, Table, Tag } from 'antd';

const urlFinnhubCompanyProfile2 = 'https://finnhub.io/api/v1/stock/profile2?symbol=';
const urlFinnhubCompanyRecommendation = 'https://finnhub.io/api/v1/stock/recommendation?symbol=';
const tokenFinnhub = 'chdons9r01qk9rb2m89gchdons9r01qk9rb2m8a0';


export default function Monitor({securitiesList}) {

let [data, setData] = useState([]);

// Asynchronous function with concurrency of actions
// Function that builds Datasource required to render the <Table> antd Component
async function getData(securitiesList) {

for (let i in securitiesList) {

console.log(i, securitiesList[i]);

    try {
        let responseProfile2 = axios.get(`${urlFinnhubCompanyProfile2}${securitiesList[i]}&token=${tokenFinnhub}`);
        let responseRecommendation = axios.get(`${urlFinnhubCompanyRecommendation}${securitiesList[i]}&token=${tokenFinnhub}`);
        let profileInfo = (await responseProfile2).data;
        let recommendation = (await responseRecommendation).data;

        let securityData = Object.assign(profileInfo, recommendation[0]);
        securityData.key = i;
        console.log(securityData);
        setData((data) => [...data, securityData]);
    }
        
    catch (error) {console.log(error)};
};
console.log('datasource:', data);
};

useEffect(() => {console.log('effect ran'); getData(securitiesList)}, [securitiesList]);


return (<><div>Salut</div></>);
};