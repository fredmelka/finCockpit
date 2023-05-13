
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    
    let error = useRouteError();
    console.warn(error);

    return (
        <div id='errorPage'>
            <h2>Oops...!?</h2>
            <p>Looks like you have gone out of bounces and an error has occured.<br></br>
               A web developer should get this issue fixed shortly. 
            </p>
            <p><i>{error.statusText || error.message}</i></p>
        </div>);
};