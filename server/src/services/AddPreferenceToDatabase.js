import { Preference, UserPreference } from "../models/index.js";

class AddPreferenceToDatabase {
    static async addPreferencesArray(array, persistedUser) {
        for (const eachPreference of array) {
            const lowerCasePreference = eachPreference.toLowerCase();
            const currentPreference = await Preference.query().findOne({
                name: lowerCasePreference,
            });
            if (!currentPreference) {
                await user.$relatedQuery("preferences").insert({ name: lowerCasePreference.name });
            } else {
                const check = await user
                    .$relatedQuery("preferences")
                    .findById(currentPreference.id);
                if (!check) {
                    await currentPreference.$relatedQuery("users").relate(user);
                } else {
                    return false;
                }
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
            const check = await user.$relatedQuery("preferences").findById(currentPreference.id);
            if (!check) {
                await currentPreference.$relatedQuery("users").relate(user);
            } else {
                return false;
            }
        }
        return true;
    }
}

export default AddPreferenceToDatabase;
