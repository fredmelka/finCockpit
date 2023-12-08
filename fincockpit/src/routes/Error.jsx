
import React                            from 'react';
import { useNavigate, useRouteError }   from 'react-router-dom';

export default function ErrorPage() {
    
let error = useRouteError();
console.log(error);

let navigate = useNavigate();
let returnHome = (event) => {event.preventDefault(); navigate('/');};

return (
    <>
    <div id='errorPage'>
        <h2>Oops...!?</h2>
        <p>Looks like you have gone out of bounces and an error has occured.
        <br />
        A web developer should get this issue fixed shortly.
        <br />
        <strong onClick={returnHome}>Return to Home page!</strong>
        </p>
        <p><code>{error.statusText || error.message}</code></p>
    </div>
    </>);
};