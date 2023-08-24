/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("preferences", (table) => {
        table.string("icon");
    });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("preferences", (table) => {
        table.dropColumn("icon");
    });
};
