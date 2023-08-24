import React from "react";
import { Link } from "react-router-dom";

const ActivityTile = (props) => {
    return (
        <Link to={`/activity/${props.name}`} className="cell small-6 medium-3 large-2">
            <h3>{props.name}</h3>
            <div className="tile-container-activities">
                <div className="interest-icon" dangerouslySetInnerHTML={{ __html: props.icon }} />
            </div>
        </Link>
    );
};

export default ActivityTile;
