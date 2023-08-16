const Model = require("./Model.js");

class UserPreference extends Model {
    static get tableName() {
        return "userPreferences";
    }

    static get relationMappings() {
        const { User, Preference } = require("./index.js");

        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "userPreferences.userId",
                    to: "users.id",
                },
            },

            preferences: {
                relation: Model.BelongsToOneRelation,
                modelClass: Preference,
                join: {
                    from: "userPreferences.preferenceId",
                    to: "preferences.id",
                },
            },
        };
    }
}

module.exports = UserPreference;
