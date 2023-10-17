import React, { useState, useEffect } from "react";
import distancesToPlaces from "../../services/distancesToPlaces.js";

const ResultTile = (props) => {
    const [timeAndDistance, setTimeAndDistance] = useState(null);

    const markerLocation = props.result.geometry.location;
    const isSelectedMarker = props.state.selectedMarker === markerLocation;
    const userLocation = props.state.chosenLocation;
    const modeOfTransportation = props.state.modeOfTransportation;

    useEffect(() => {
        let isMounted = true;
        distancesToPlaces(markerLocation, userLocation, modeOfTransportation).then((result) => {
            if (isMounted) {
                setTimeAndDistance(result);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [modeOfTransportation]);

    const handleTileClick = () => {
        if (props.markerLocation === markerLocation) {
            props.dispatch({ type: "selectedMarker", selectedMarker: null });
            props.dispatch({ type: "selectedPlaceName", selectedPlaceName: null });
        } else {
            props.dispatch({ type: "selectedMarker", selectedMarker: markerLocation });
            props.dispatch({ type: "selectedPlaceName", selectedPlaceName: props.result.name });
            props.centerMapOnMarker(markerLocation);
        }
    };

    return (
        <div
            className={`cell small-12 medium-6 large-4 tile${isSelectedMarker ? " selected" : ""}`}
            onClick={handleTileClick}
        >
            <div className="tile-container cell small-12">
                {props.result.photos ? (
                    <img
                        className="cell small-12"
                        src={`${props.result.photos && props.result.photos[0].getUrl()}`}
                        alt={`${props.result.name}`}
                    />
                ) : (
                    <img
                        className="cell small-12"
                        src="https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg"
                        alt="Brick wall"
                    />
                )}
                <h5 className="cell small-12">{props.result.name}</h5>
                {timeAndDistance}

                {props.state.selectedMarker === markerLocation ? (
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
