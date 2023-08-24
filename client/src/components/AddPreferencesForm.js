import React, { useState } from "react";
import { Input, Text } from "@chakra-ui/react";
import options from "../services/userSelections";
import CreatableSelect from "react-select/creatable";

const AddPreferenceForm = (props) => {
    const [newPreference, setNewPreference] = useState({
        name: "",
        icon: '<i class="fa-solid fa-user-plus"></i>',
    });
    const handleInputChange = (event) => {
        setNewPreference({
            ...newPreference,
            name: event.value,
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
            icon: '<i class="fa-solid fa-user-plus"></i>',
        });
    };
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <Text lg="20px">Add a new Interest!</Text>
                    <CreatableSelect
                        isClearable
                        options={options}
                        onChange={handleInputChange}
                        focusBorderColor="#0606ff"
                        placeholder="Type a new interest!"
                        defaultValue={newPreference.name}
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
