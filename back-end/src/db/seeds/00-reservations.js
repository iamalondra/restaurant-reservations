const seedData = require("./00-reservations.json")

exports.seed = function(knex) {
  //this didn't reset identities 
  // Deletes ALL existing entries
  // return knex('reservations').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('reservations').insert(seedData);
  //   });

  //https://github.com/knex/knex/issues/1506#issuecomment-446975889 
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(() => knex("reservations").insert(seedData));
};
