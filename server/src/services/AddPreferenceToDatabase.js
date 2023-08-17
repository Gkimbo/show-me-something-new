import { Preference, UserPreference } from "../models/index.js";

class AddPreferenceToDatabase {
    static async addPreferencesArray(array, persistedUser) {
        for (const eachPreference of array) {
            const lowerCasePreference = eachPreference.toLowerCase();
            const currentPreference = await Preference.query().findOne({
                name: lowerCasePreference,
            });
            if (!currentPreference) {
                await persistedUser.$relatedQuery("preferences").insert({ name: eachPreference });
            } else {
                await currentPreference.$relatedQuery("users").relate(persistedUser);
            }
        }
        return true;
    }
}

export default AddPreferenceToDatabase;
