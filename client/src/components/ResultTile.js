import React from "react";

const ResultTile = (props) => {
  return (
    <div className="tile-container">
      <h4>{props.result.name}</h4>
      <p>{props.result.formatted_address}</p>
      <p>{props.result.rating} / 5</p>
    </div>
  );
};

export default ResultTile;
