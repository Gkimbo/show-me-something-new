import React from "react";
import ResultTile from "../tiles/ResultTile";

const ResultList = (props) => {
    const resultsByActivity = {};
    props.state.searchResults.forEach((result) => {
        if (result.activity in resultsByActivity) {
            resultsByActivity[result.activity].push(result);
        } else {
            resultsByActivity[result.activity] = [result];
        }
    });

    const handleClick = (event) => {
        if (props.state.selectedActivity === event) {
            props.dispatch({
                type: "selectedActivity",
                selectedActivity: null,
            });
        } else {
            props.dispatch({
                type: "selectedActivity",
                selectedActivity: event,
            });
        }
    };

    let activityContainers;
    if (props.state.searchResults.length <= 20) {
        activityContainers = Object.keys(resultsByActivity).map((activity) => {
            const results = resultsByActivity[activity];
            return (
                <div key={activity} className="grid-x grid-margin-x grid-margin-y">
                    {results.map((result) => (
                        <ResultTile
                            key={result.place_id}
                            dispatch={props.dispatch}
                            state={props.state}
                            result={result}
                            onTileClick={props.centerMapOnMarker}
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
                    {props.state.selectedActivity === activity ? (
                        <div className="container-of-tiles">
                            <div className="grid-x grid-margin-x grid-margin-y">
                                {results.map((result) => (
                                    <ResultTile
                                        key={result.place_id}
                                        dispatch={props.dispatch}
                                        state={props.state}
                                        result={result}
                                        onTileClick={props.centerMapOnMarker}
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
