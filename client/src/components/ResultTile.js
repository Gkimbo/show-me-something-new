import React from "react";

const ResultTile = (props) => {
    return (
        <div className="small-12 medium-6 large-4">
            <div className="tile-container">
                <h4>{props.result.name}</h4>
            </div>
        </div>
    );
};

export default ResultTile;
