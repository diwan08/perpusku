const bcrypt = require("bcrypt")
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
   {
    id: require("crypto").randomUUID(),
    username:"diwan08",
    password: bcrypt.hashSync("diwan0810", 10),
    role: "officer"
   }
  ]);
};
