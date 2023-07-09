import classes from "./About.module.css";
import {FaNodeJs,FaReact } from "react-icons/fa";

function About():JSX.Element {
    return <section className={classes.about}>
        <div className={classes.imageContainer}>
            <img src="./Assets/Frankfort.jpg" alt="Frankfurt by sneha" />
        </div>
        <h2 className={classes.aboutHeader}>About Vacation Dream</h2>
        <div className={classes.aboutBody}>
            <p>This site is about Tourism,It have all kind of attractive locations arround the world.
                The things you can do in that site:
            </p>
            <ul className={classes.aboutList}>
                <li data-icon="⭐">As a guest you can see all the different Vacation Packages & trips </li>
                <li data-icon="⭐">You can filter the vacations by price or by name</li>
                <li data-icon="⭐">You can also see the most popular vacations in the statistics charts</li>
                <li data-icon="⭐">As you register you will be able to add the vacations you are interested in your watch list and the vacation will be bookmarked. </li>
                <li data-icon="⭐">Admins can add new vacations edit or delete them </li>
            </ul>
            <p>The project was created using mainly by the following technologies:</p>

            <ul className={classes.aboutList}>
                <li data-icon="⭐"><p>Server side implamented using nodejs and sql database</p><FaNodeJs className={classes.nodejs} /></li>
                <li data-icon="⭐">Client side implamented using framework react<FaReact className={classes.react} /></li>
            </ul>
        </div>
    </section>
}

export default About;