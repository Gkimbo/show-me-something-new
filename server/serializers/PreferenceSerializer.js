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
}

export default PreferenceSerializer;
