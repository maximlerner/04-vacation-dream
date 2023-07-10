import { useState,useEffect } from "react";
import {BarChart,Bar,XAxis,YAxis} from "recharts";

import classes from "./Statistics.module.css";
import VacationModel from "../../Models/VacationModel";
import vacationService from "../../Services/VacationService";
  
function Statistics():JSX.Element {
    
    const [vacationsList, setVacationList] = useState<VacationModel[]>([]);
    const chartData:any = [];

    useEffect(() => {
        vacationService.getAllVacations(setVacationList);
      })

    // Here we add objects to chartData only if the vacation have followers
    vacationsList.map((vacation) => {
        if(vacation.followers > 0) {
            console.log("line 31")
            chartData.push({destination: vacation.destination, followers: vacation.followers});
        }
    })
    
    return <section className={classes.statistics}>
        <div className={classes.chart}>
            <h2 className={classes.statisticsTitle}>statistics</h2>
            <p className={classes.statisticsDescription}>Number of subscribers per destination</p>
            <BarChart className={classes.BarChart}   width={675} height={180} data={chartData}>
                <Bar dataKey="followers" fill="#8884d8" />
                <XAxis dataKey="destination" />
                <YAxis />
                <Bar dataKey="name" fill="#8884d8" />
            </BarChart>
        </div>
    </section>
}

export default Statistics;