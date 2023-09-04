import _ from "lodash";
import { Preference } from "../models/index.js";

class AddPreferenceToDatabase {
    static async addPreferencesArray(array, user) {
        for (const eachPreference of array) {
            const lowerCasePreference = eachPreference.toLowerCase();
            const upperCase = _.upperFirst(lowerCasePreference);
            const currentPreference = await Preference.query().findOne({
                name: upperCase,
            });
            if (!currentPreference) {
                await user.$relatedQuery("preferences").insert({ name: upperCase });
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
        const upperCase = _.upperFirst(lowerCasePreference);
        const currentPreference = await Preference.query().findOne({
            name: upperCase,
        });
        if (!currentPreference) {
            await user.$relatedQuery("preferences").insert({ name: upperCase });
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

    static async adminAddPreference(preference) {
        const lowerCasePreference = preference.toLowerCase();
        const upperCase = _.upperFirst(lowerCasePreference);
        const currentPreference = await Preference.query().findOne({
            name: upperCase,
        });
        if (!currentPreference) {
            await Preference.query().insert({ name: upperCase });
            return true;
        } else {
            return false;
        }
    }
}

export default AddPreferenceToDatabase;
