import React, { useState } from "react";
import { Input, Text } from "@chakra-ui/react";

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
                    <Text mb="8px">Add a new Preference!</Text>
                    <Input
                        name="name"
                        onChange={handleInputChange}
                        focusBorderColor="#094067"
                        placeholder="Breweries..."
                        value={newPreference.name}
                        size="sm"
                    />
                </label>
                <div className="button-add cell small-12" onClick={handleSubmit}>
                    Add
                </div>
            </form>
        </div>
    );
};

export default AddPreferenceForm;
