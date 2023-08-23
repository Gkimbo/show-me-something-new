import React from "react";
import ResultTile from "./ResultTile";

const ResultList = (props) => {
    const results = props.searchResults.map((result) => {
        console.log(result);
        return (
            <ResultTile
                key={result.place_id}
                result={result}
                onTileClick={props.centerMapOnMarker}
                markerLocation={props.markerLocation}
                setSelectedMarker={props.setSelectedMarker}
                centerMapOnMarker={props.centerMapOnMarker}
            />
        );
    });

    return <div className="grid-x grid-margin-x grid-margin-y">{results}</div>;
};

export default ResultList;
