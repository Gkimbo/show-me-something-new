import React, { useState } from "react";

const UpdatePreferences = (props) => {
    const [customActivities, setCustomActivities] = useState([]);

    useEffect(() => {
        GetActivity.getCustomActivities().then((activityData) => {
            setCustomActivities(activityData);
        });
    }, []);
    return (
        <form>
            <h1>Manage your preferences here!</h1>
        </form>
    );
};

export default UpdatePreferences;
