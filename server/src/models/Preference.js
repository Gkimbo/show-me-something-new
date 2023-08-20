const Model = require("./Model.js");

const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
    fields: ["name"],
});

class Preference extends unique(Model) {
    static get tableName() {
        return "preferences";
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
            },
        };
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
