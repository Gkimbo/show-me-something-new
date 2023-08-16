import React, { useState, useEffect } from "react";
import CustomMap from "./CustomMap";

const ActivityShowPage = (props) => {
    const [customActivities, setCustomActivities] = useState([]);

    const getCustomActivities = async () => {
        try {
            const response = await fetch("/api/v1/activity/my-activities");
            if (!response) {
                const error = new Error(`${response.status} (${response.statusText})`);
                throw error;
            }
            const responseData = await response.json();
            setCustomActivities(responseData.activities);
        } catch (error) {
            console.error("Error in fetch", error.message);
        }
    };

    useEffect(() => {
        getCustomActivities();
    }, []);

    return <CustomMap customActivities={customActivities} />;
};

export default ActivityShowPage;
