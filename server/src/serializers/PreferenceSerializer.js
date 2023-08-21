class PreferenceSerializer {
    static getSummaryOfArray(array) {
        const allowedAttributes = ["id", "name"];
        const serializedPreferences = array.map((preference) => {
            const cleanedPreference = {};
            for (const attribute of allowedAttributes) {
                cleanedPreference[attribute] = preference[attribute];
            }
            return cleanedPreference;
        });
        return serializedPreferences;
    }

    static getSummaryOfOne(preference) {
        const allowedAttributes = ["id", "name"];
        const serializedPreference = {};
        for (const attribute of allowedAttributes) {
            serializedPreference[attribute] = preference[attribute];
        }
        return serializedPreference;
    }
}

export default PreferenceSerializer;
