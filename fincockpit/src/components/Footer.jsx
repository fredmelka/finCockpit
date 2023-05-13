
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {

let navigate = useNavigate();

let goBack = () => {navigate(-1)};
let goForward = () => {navigate(+1)};

return (
    <footer>
        <h3>Stock quotes ticker is under construction!</h3>
        <button onClick={goBack}>Back</button>
        <button onClick={goForward}>Forward</button>
    </footer>);
};

export default Footer;