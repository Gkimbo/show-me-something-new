import React, { useState } from "react";
import ResultTile from "./ResultTile";

const ResultList = (props) => {
    const resultsByActivity = {};
    props.searchResults.forEach((result) => {
        if (result.activity in resultsByActivity) {
            resultsByActivity[result.activity].push(result);
        } else {
            resultsByActivity[result.activity] = [result];
        }
    });

    const handleClick = (event) => {
        if (props.selectedActivity === event) {
            props.setSelectedActivity(null);
        } else {
            props.setSelectedActivity(event);
        }
    };

    let activityContainers;
    if (props.searchResults.length <= 20) {
        activityContainers = Object.keys(resultsByActivity).map((activity) => {
            const results = resultsByActivity[activity];
            return (
                <div key={activity} className="grid-x grid-margin-x grid-margin-y">
                    {results.map((result) => (
                        <ResultTile
                            key={result.place_id}
                            result={result}
                            onTileClick={props.centerMapOnMarker}
                            markerLocation={props.markerLocation}
                            setSelectedMarker={props.setSelectedMarker}
                            centerMapOnMarker={props.centerMapOnMarker}
                        />
                    ))}
                </div>
            );
        });
    } else {
        activityContainers = Object.keys(resultsByActivity).map((activity) => {
            const results = resultsByActivity[activity];
            return (
                <div key={activity}>
                    <div
                        className="result-container-title button-1-activity"
                        onClick={() => handleClick(activity)}
                    >
                        {activity}
                    </div>
                    {props.selectedActivity === activity ? (
                        <div className="container-of-tiles">
                            <div className="grid-x grid-margin-x grid-margin-y">
                                {results.map((result) => (
                                    <ResultTile
                                        key={result.place_id}
                                        result={result}
                                        onTileClick={props.centerMapOnMarker}
                                        markerLocation={props.markerLocation}
                                        setSelectedMarker={props.setSelectedMarker}
                                        centerMapOnMarker={props.centerMapOnMarker}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            );
        });
    }

    return <div>{activityContainers}</div>;
};

export default ResultList;
