
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Oopsies () {

let navigate = useNavigate();
let returnHome = (event) => {event.preventDefault(); navigate('/');};

return (
    <>
    <h2>Feeling lost...!?</h2>
    <p>Looks like you are lost in translation.
        <br></br>
        You can return home by clicking 
        <strong onClick={returnHome}> here</strong>.
    </p>
    </>);
};