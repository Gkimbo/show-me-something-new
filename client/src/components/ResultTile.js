import React from "react";

const ResultTile = (props) => {
    const markerLocation = props.result.geometry.location;
    const isSelectedMarker = props.markerLocation === markerLocation;

    const handleTileClick = () => {
        if (props.markerLocation === markerLocation) {
            props.setSelectedMarker(null);
        } else {
            props.setSelectedMarker(markerLocation);
            props.centerMapOnMarker(markerLocation);
        }
    };
    return (
        <div
            className={`small-12 medium-6 large-4 tile${isSelectedMarker ? "selected" : ""}`}
            onClick={handleTileClick}
        >
            <div className="tile-container">
                {props.result.photos ? (
                    <img
                        src={`${props.result.photos && props.result.photos[0].getUrl()}`}
                        alt={`${props.result.name}`}
                    />
                ) : (
                    <img
                        src="https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg"
                        alt="Brick wall"
                    />
                )}
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
