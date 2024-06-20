//20240406183514_workers
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('workers', table => {
            table.increments('id').notNullable().unique().primary();
            table.string('name').notNullable();
            table.string('surname').notNullable();
            table.string('email').notNullable();
            table.string('position').notNullable();
            table.enum('contract', ['umowa o prace', 'umowa zlecenie']).defaultTo('umowa o prace')
            table.integer('vacationDays').notNullable();
            table.integer('workHours').notNullable();
            table.integer('moneyperHour').notNullable();
            table.integer('seniorityinYears').notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('workers')
};
