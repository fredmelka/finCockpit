
import React from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from 'antd';

export default function Footer () {

let navigate = useNavigate();

let goBack = () => {navigate(-1)};
let goForward = () => {navigate(+1)};

return (
    <footer>
    
    <Divider>
        <code>Build under progress. Coders currently at work</code>
        <button onClick={goBack}>Back</button>
        <button onClick={goForward}>Forward</button>
    </Divider>

    </footer>);
};