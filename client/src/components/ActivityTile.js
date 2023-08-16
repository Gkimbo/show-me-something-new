import React from "react";
import { Link } from "react-router-dom";

const ActivityTile = (props) => {
    return (
        <Link to={`/activity/${props.name}`} className="cell small-3">
            <div className="tile-container-activities">{props.name}</div>
        </Link>
    );
};

export default ActivityTile;
