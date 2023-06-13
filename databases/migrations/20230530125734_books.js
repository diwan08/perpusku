/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("books", t => {
    t.string("id").primary()
    t.string("name").notNullable()
    t.string("author").notNullable()
    t.string("category").notNullable()
    t.string("publisher").notNullable()
    t.dateTime("publication_year").notNullable()
    t.integer("stock").notNullable()
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
