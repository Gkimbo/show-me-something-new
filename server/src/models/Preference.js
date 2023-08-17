const Model = require("./Model.js");

class Preference extends Model {
    static get tableName() {
        return "preferences";
    }
    static get relationMappings() {
        const { User, UserPreference } = require("./index.js");
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "preferences.id",
                    through: {
                        from: "userPreferences.preferenceId",
                        to: "userPreferences.userId",
                    },
                    to: "users.id",
                },
            },
            userPreferences: {
                relation: Model.HasManyRelation,
                modelClass: UserPreference,
                join: {
                    from: "preferences.id",
                    to: "userPreferences.preferenceId",
                },
            },
        };
    }
}

module.exports = Preference;
