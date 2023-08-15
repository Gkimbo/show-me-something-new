import React, { useEffect, useState } from "react";
import ActivityTile from "./components/ActivityTile";

const ActivitiesList = (props) => {
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    try {
      const response = await fetch("/api/v1/activity");
      if (!response) {
        const error = new Error(`${response.status} (${response.statusText})`);
        throw error;
      }
      const responseData = await response.json();
      setActivities(responseData.activities);
    } catch (error) {
      console.error("Error in fetch", error.message);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const activitiesList = activities.map((activity) => {
    return <ActivityTile key={activity.id} id={activity.id} name={activity.name} />;
  });
  return <ul className="grid-x">{activitiesList}</ul>;
};

export default ActivitiesList;
