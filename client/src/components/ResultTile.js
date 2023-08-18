import React from "react";

const ResultTile = (props) => {
    const markerLocation = props.result.geometry.location;
    const handleTileClick = () => {
        props.onTileHover(markerLocation);
    };

    return (
        <div className="small-12 medium-6 large-4" onClick={handleTileClick}>
            <div className="tile-container">
                <h6>{props.result.name}</h6>
                {props.markerLocation === markerLocation ? (
                    <ul>
                        <li>Address:{props.result.formatted_address}</li>
                        <li>Rating: {props.result.rating}/5</li>
                    </ul>
                ) : null}
            </div>
        </div>
    );
};

export default ResultTile;
