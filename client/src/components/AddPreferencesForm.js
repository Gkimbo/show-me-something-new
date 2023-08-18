import React, { useState } from "react";

const AddPreferenceForm = (props) => {
    const [newPreference, setNewPreference] = useState({
        name: "",
    });
    const handleInputChange = (event) => {
        setNewPreference({
            ...newPreference,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAddPreference(newPreference);
        clearForm();
    };

    const clearForm = () => {
        setNewPreference({
            name: "",
        });
    };
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <input
                        className="text-box-1"
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={newPreference.name}
                        placeholder="Add New Preference"
                    />
                </label>
                <input className="button" type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddPreferenceForm;
