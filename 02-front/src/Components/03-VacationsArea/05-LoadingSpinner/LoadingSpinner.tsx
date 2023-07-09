import classes from "./Loading.module.css";
import config from "../../../Utils/Config";

function LoadingSpinner():JSX.Element {
    return <div className={classes.spinner}>
        <img className={classes.spinnerImage}  src={config.urls.spinner} />
    </div>
}

export default LoadingSpinner;