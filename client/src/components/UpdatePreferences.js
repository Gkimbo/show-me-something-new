import React, { useState, useEffect } from "react";
import GetActivity from "../services/GetActivity";
import ModifyPreferences from "../services/ModifyPreferences";
import AddPreferenceForm from "./AddPreferencesForm";
import EditPreferenceForm from "./EditPreferenceForm";
import PreferenceTile from "./PreferenceTile";
import FormError from "./layout/FormError";

const UpdatePreferences = (props) => {
    const [customActivities, setCustomActivities] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const [preference, setPreference] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetActivity.getCustomActivities().then((activityData) => {
            setCustomActivities(activityData);
        });
    }, []);

    const removePreference = async (id) => {
        ModifyPreferences.deletePreference(id).then((response) => {
            setCustomActivities(customActivities.filter((response) => response.id !== id));
        });
    };

    const changePreference = async (newEditedPreference) => {
        if (!newEditedPreference.name || newEditedPreference.name.trim() === "") {
            setError({
                changeInputError: "Invalid preference name. Choose another preference to edit.",
            });
            return;
        }

        const preferenceExists = customActivities.some(
            (activity) => activity.name === newEditedPreference.name
        );

        if (preferenceExists) {
            setError({
                editError:
                    "Preference already exists in your list! Choose another preference to edit.",
            });
            return;
        }

        if (preference.name !== newEditedPreference.name) {
            const id = preference.id;
            ModifyPreferences.editPreference(id, newEditedPreference).then((response) => {
                const addEditedPreference = customActivities.map((preference) => {
                    if (preference.id === id) {
                        preference = response;
                    }
                    return preference;
                });
                setCustomActivities(addEditedPreference);
            });
        } else {
            setError({ editError: "No changes made to the preference." });
        }
    };

    const onAddPreference = async (newPreference) => {
        if (!newPreference.name || newPreference.name.trim() === "") {
            setError({ addInputError: "Please enter a valid preference name." });
            return;
        }
        const preferenceExists = customActivities.some(
            (activity) => activity.name === newPreference.name
        );

        if (preferenceExists) {
            setError({ addError: "Preference already exists in your list!" });
            return;
        }
        ModifyPreferences.addNewPreference(newPreference).then((response) => {
            setCustomActivities(response.preferences);
            setError({});
        });
    };

    const handleDelete = (id) => {
        setEditForm(false);
        removePreference(id);
    };

    const handleEdit = (id) => {
        setEditForm(true);
        const preference = customActivities.find((preference) => preference.id === id);
        setPreference(preference);
    };

    const handleNewPreferenceButton = () => {
        setEditForm(false);
    };

    const listUsersPreference = customActivities.map((activity) => {
        return (
            <PreferenceTile
                key={activity.id}
                id={activity.id}
                name={activity.name}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        );
    });
    return (
        <div className="grid-x">
            <div className="cell small-12 activity-title-1">
                <h1>Manage your interests here!</h1>
            </div>
            <div className="cell small-12 medium-6">
                <div className="container-2">
                    <div className="grid-x">{listUsersPreference}</div>
                </div>
            </div>
            <div className="cell small-12 medium-6">
                <div className="container">
                    <div className="change-forms">
                        {!editForm && (
                            <>
                                <AddPreferenceForm
                                    preference={preference}
                                    onAddPreference={onAddPreference}
                                />
                                {error.addError && <FormError error={error.addError} />}
                                {error.addInputError && <FormError error={error.addInputError} />}
                                {error.editError && <FormError error={error.editError} />}
                                {error.changeInputError && (
                                    <FormError error={error.changeInputError} />
                                )}
                            </>
                        )}
                        {editForm && (
                            <>
                                <h3>Edit interest here! </h3>
                                <EditPreferenceForm
                                    preference={preference}
                                    changePreference={changePreference}
                                    setEditForm={setEditForm}
                                />
                            </>
                        )}
                    </div>
                </div>
                {editForm && (
                    <div
                        className="button-toggle cell small-12"
                        onClick={handleNewPreferenceButton}
                    >
                        Add new preference
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdatePreferences;
