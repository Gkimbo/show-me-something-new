import React, { useState, useEffect } from "react";
import GetActivity from "../services/GetActivity";
import ModifyPreferences from "../services/ModifyPreferences";
import AddPreferenceForm from "./AddPreferencesForm";
import EditPreferenceForm from "./EditPreferenceForm";
import PreferenceTile from "./PreferenceTile";

const UpdatePreferences = (props) => {
    const [customActivities, setCustomActivities] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const [preference, setPreference] = useState([]);

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
        const id = preference.id;
        ModifyPreferences.editPreference(id, newEditedPreference).then((response) => {
            const addEditedPreference = customActivities.map((preference) => {
                if (preference.id === id) {
                    preference.name = response.name;
                }
                return preference;
            });
            setCustomActivities(addEditedPreference);
        });
    };
    const onAddPreference = async (newPreference) => {
        ModifyPreferences.addNewPreference(newPreference).then((response) => {
            setCustomActivities(response.preferences);
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
            <div className="cell small-12 activity-title">
                <h1>Manage your preferences here!</h1>
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
                                <h3>Add a new preference!</h3>
                                <AddPreferenceForm
                                    preference={preference}
                                    onAddPreference={onAddPreference}
                                />
                            </>
                        )}
                        {editForm && (
                            <>
                                <h3>Edit preferences here! </h3>
                                <EditPreferenceForm
                                    preference={preference}
                                    changePreference={changePreference}
                                />
                                <button className="button" onClick={handleNewPreferenceButton}>
                                    Add a new preference
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePreferences;
