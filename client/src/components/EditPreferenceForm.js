import React, { useState } from "react";
import { Input, Text } from "@chakra-ui/react";

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
                    <Text lg="20px">{`Edit Your ${preference.name} interest!`}</Text>
                    <Input
                        name="name"
                        onChange={handleInputChange}
                        focusBorderColor="#13a200"
                        placeholder={`Edit ${preference.name} here!`}
                        value={newPreference.name}
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
