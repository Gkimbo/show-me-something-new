import { User } from "../../models/index.js";
import AddPreferenceToDatabase from "../../services/AddPreferenceToDatabase.js";
import { arrayOfPreferences } from "../../services/arrayOfPreferences.js";

class GuestUserSeeder {
    static async seed() {
        const guestAccounts = [
            {
                email: "GUEST@Guest.com",
                password: "guest1",
                username: "guest",
            },
        ];

        for (const guest of guestAccounts) {
            const currentUser = await User.query().findOne({
                username: guest.username,
            });
            if (!currentUser) {
                const guest1 = await User.query().insert(guest);
                if (guest1) {
                    await AddPreferenceToDatabase.addPreferencesArray(arrayOfPreferences, guest1);
                }
            }
        }
    }
}

export default GuestUserSeeder;
