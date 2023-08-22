import React, { useEffect, useState } from "react";
import GetActivity from "../services/GetActivity";
import ActivityTile from "./ActivityTile";

const ActivitiesList = (props) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        GetActivity.getAllActivities().then((activities) => {
            setActivities(activities);
        });
    }, []);

    const activitiesList = activities.map((activity) => {
        return <ActivityTile key={activity.id} id={activity.id} name={activity.name} />;
    });
    return <div className="grid-x grid-margin-x grid-margin-y">{activitiesList}</div>;
};

export default ActivitiesList;
