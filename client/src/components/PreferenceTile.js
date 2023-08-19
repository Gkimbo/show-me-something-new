import React from "react";

const PreferenceTile = ({ name, handleDelete, handleEdit, id }) => {
    return (
        <div className="cell small-6">
            <div className="tile-container">
                <h3 className="cell small-12">{name}</h3>
                <div className="button-edit cell small-12" onClick={() => handleEdit(id)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </div>
                <div className="button-delete cell small-12" onClick={() => handleDelete(id)}>
                    <i className="fa-regular fa-trash-can"></i>
                </div>
            </div>
        </div>
    );
};

export default PreferenceTile;
