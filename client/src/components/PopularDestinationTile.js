import React from "react";

const PopularDestinationTile = (props) => {
    return (
        <>
            <li key={props.name}>{props.name}</li>
            <img src={props.photo} alt={`Photo of ${props.name}`}/>
        </>
    );
};

export default PopularDestinationTile
