/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker');
var users= []
for (let i = 0; i < 10; i++) {

    users.push(
        {
            name: faker.internet.userName(),
            password: faker.internet.password(),
            email: faker.internet.email(),
            isadmin: true

        }
       
    )
    
   }
console.log(users)
exports.up = function(knex) {
   return knex('users')
    .insert(users
    
    )

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
