import React, { useState } from "react";

const EditPreferenceForm = ({ changePreference, preference, setEditForm }) => {
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
        changePreference(newPreference);
        clearForm();
    };

    const clearForm = () => {
        setNewPreference({
            name: "",
        });
        setEditForm(false);
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
                        placeholder={`Edit Your ${preference.name} interest!`}
                    />
                </label>
                <div className="button-add cell small-12" onClick={handleSubmit}>
                    Edit
                </div>
            </form>
        </div>
    );
};

export default EditPreferenceForm;
