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

    static async addOnePreference(preference, user) {
        const lowerCasePreference = preference.toLowerCase();
        const currentPreference = await Preference.query().findOne({
            name: lowerCasePreference,
        });
        if (!currentPreference) {
            await user.$relatedQuery("preferences").insert({ name: lowerCasePreference });
        } else {
            await currentPreference.$relatedQuery("users").relate(user);
        }
        return true;
    }
}

export default AddPreferenceToDatabase;
