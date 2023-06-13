/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("rack", t => {
    t.increments("id")
    t.string("location_rack").notNullable()
    t.string("id_book").notNullable()
    t.foreign("id_book").references("id").inTable("books").onDelete("CASCADE")
    t.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("books")
};
