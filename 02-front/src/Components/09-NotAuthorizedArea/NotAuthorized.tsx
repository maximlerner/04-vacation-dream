import classes from "./NotAuthorized.module.css";
import { useNavigate } from "react-router-dom";

function NotAuthorized():JSX.Element {
    const navigator = useNavigate();

    function handleNavigate() {
        navigator("/home");
    }
    return <div className={classes.title}>
        <h2 >You are not authorized to perform that action,send us email if there any issues.</h2>
        <button className={classes.btn} onClick={handleNavigate}>Home Page</button>
    </div>
}

export default NotAuthorized;