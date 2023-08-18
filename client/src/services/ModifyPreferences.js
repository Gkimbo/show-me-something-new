class ModifyPreferences {
    static async deletePreference(id) {
        try {
            const response = await fetch(`/api/v1/users/preferences/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`);
            }
            const responseData = await response.json();
            return responseData.preference;
        } catch (error) {
            console.error("Error in fetch!", error.message);
        }
    }

    static async editPreference(id, preference) {
        try {
            const response = await fetch(`/api/v1/users/preferences/${id}`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(preference),
            });
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json();
                    const newErrors = translateServerErrors(errorBody.errors);
                    return setErrors(newErrors);
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`;
                    const error = new Error(errorMessage);
                    throw error;
                }
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    }

    static async addNewPreference(newPreference) {
        try {
            const response = await fetch("/api/v1/users/preferences", {
                method: "POST",
                body: JSON.stringify(newPreference),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            });
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const responseData = await response.json();
            return responseData;
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`);
        }
    }
}

export default ModifyPreferences;
