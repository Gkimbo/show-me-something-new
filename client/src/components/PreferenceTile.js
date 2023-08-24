import React from "react";

const PreferenceTile = ({ name, handleDelete, handleEdit, id }) => {
    return (
        <div className="cell medium-12 large-6">
            <div className="tile-container">
                <h3 className="interest-title cell small-12">{name}</h3>
                <div className="button-edit cell small-12" onClick={() => handleEdit(id)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                    <p className="tile-text">Edit</p>
                </div>
                <div className="button-delete cell small-12" onClick={() => handleDelete(id)}>
                    <i className="fa-regular fa-trash-can"></i>
                    <p className="tile-text">Delete</p>
                </div>
            </div>
        </div>
    );
};

export default PreferenceTile;
