/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", t => {
    t.string("id").primary()
    t.string("username").notNullable()
    t.string("password").notNullable()
    t.string("name").notNullable()
    t.text("address").notNullable()
    t.dateTime("birthdate").notNullable()
    t.enum("role",["officer","member"]).notNullable()
    t.string("avatar")
    t.timestamps(true,true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
