import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import FormError from "../layout/FormError";

import options from "../../services/userSelections";

const EditPreferenceForm = ({ changePreference, preference, setEditForm, username }) => {
    const [newPreference, setNewPreference] = useState({
        name: "",
    });
    const [error, setError] = useState(null);
    console.log(error);
    console.log(username);

    const handleInputChange = (event) => {
        setNewPreference({
            ...newPreference,
            name: event.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === "guest") {
            setError("This is a guest account, please sign in or sign up to customize interests!");
        } else {
            changePreference(newPreference);
            clearForm();
        }
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
                {error && (
                    <div className="delete-error">
                        <FormError error={error} />
                    </div>
                )}
            </form>
        </div>
    );
};

export default EditPreferenceForm;
