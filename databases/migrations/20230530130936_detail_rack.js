/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("detail_rack", t => {
    t.increments("id")
    t.string("id_book").notNullable()
    t.foreign("id_book").references("id").inTable("books").onDelete("CASCADE")
    t.integer("id_rack").notNullable().unsigned()
    t.foreign("id_rack").references("id").inTable("rack").onDelete("CASCADE")
    t.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("detail_rack")
};
