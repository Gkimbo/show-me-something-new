import React from "react";
import { Link } from "react-router-dom";

const PopularDestinationTile = (props) => {
    return (
        <div className="slide">
            <li key={props.name} className="list-destinations">{props.name}</li>
            <Link to={`/${props.name}`}>
                <img src={props.photo} alt={`Photo of ${props.name}`}/>
            </Link>
        </div>
    );
};

export default PopularDestinationTile
