/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', table => {
        table.increments('id').notNullable().unique().primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.boolean('isadmin').notNullable();
        table.enum('role', ['admin', 'user']).defaultTo('admin')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
