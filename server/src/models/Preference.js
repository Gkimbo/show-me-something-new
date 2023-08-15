const Model = require("./Model.js");

class Preference extends Model {
    static get tableName() {
        return "preferences";
    }
}

module.exports = Preference;
