import { Preference, UserPreference } from "../src/models/index.js";

class AddToPreferences {
    static async addPreferencesArray(array, persistedUser) {
        for (const eachPreference of array) {
            const currentPreference = await Preference.query().findOne({
                name: eachPreference,
            });
            if (!currentPreference) {
                await persistedUser.$relatedQuery("preferences").insert({ name: eachPreference });
            } else {
                await UserPreference.query().insert({
                    preferenceId: currentPreference.id,
                    userId: persistedUser.id,
                });
            }
        }
        return true;
    }
}

export default AddToPreferences;
