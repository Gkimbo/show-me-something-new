import React, { useMemo } from "react";
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

    const activityContainers = Object.keys(resultsByActivity).map((activity) => {
        const results = resultsByActivity[activity];
        return (
            <div key={activity} className="container-4">
                <h2>{activity}</h2>
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
        );
    });

    return <div>{activityContainers}</div>;
};

export default ResultList;
