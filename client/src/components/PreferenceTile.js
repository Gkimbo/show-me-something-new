import React from "react";

const PreferenceTile = ({ name, handleDelete, handleEdit, id }) => {
    return (
        <div className="cell small-6">
            <div className="tile-container">
                <h3>{name}</h3>
                <div className="button cell small-12" onClick={() => handleEdit(id)}>
                    Edit preference
                </div>
                <div className="button cell small-12" onClick={() => handleDelete(id)}>
                    Delete preference
                </div>
            </div>
        </div>
    );
};

export default PreferenceTile;
