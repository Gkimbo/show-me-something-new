import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";

import options from "../../services/userSelections.js";

const EditPreferenceForm = ({ changePreference, preference, setEditForm }) => {
    const [newPreference, setNewPreference] = useState({
        name: "",
    });

    const handleInputChange = (event) => {
        setNewPreference({
            ...newPreference,
            name: event.value,
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
                    <Text
                        lg="20px"
                        className="createable-select-title"
                    >{`Edit Your ${preference.name} interest!`}</Text>
                    <CreatableSelect
                        isClearable
                        className="createable-select"
                        options={options}
                        onChange={handleInputChange}
                        focusBorderColor="#13a200"
                        placeholder={`Edit ${preference.name} here!`}
                        defaultValue={newPreference.name}
                        size="sm"
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
