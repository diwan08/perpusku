/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("loans", t => {
    t.increments("id")
    t.dateTime("loan_date").notNullable()
    t.dateTime("return_date").notNullable()
    t.integer("loan_amount").notNullable()
    t.string("id_book").notNullable()
    t.foreign("id_book").references("id").inTable("books").onDelete("CASCADE")
    t.string("id_user").notNullable()
    t.foreign("id_user").references("id").inTable("users").onDelete("CASCADE")
    t.timestamps(true,true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("loans")
};
