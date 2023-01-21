/*
exports.up = function(knex) {
  return knex.schema.createTable("theaters", (table) => {
    table.increments("theater_id").primary();
    table.string("name");
    table.string("address_line_1");
    table.string("address_line_2");
    table.string("city");
    table.string("state");
    table.string("zip");
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("theaters")
};
 */

exports.up = function(knex) {
  return knex.schema.alterTable("reservations", table => {
    table.varchar("first_name").notNullable()
    table.varchar("last_name").notNullable()
    table.varchar("mobile_number").notNullable()
    table.date("reservation_date").notNullable()
    table.time("reservation_time").notNullable()
    table.integer("people").notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("reservations", table => {
    table.dropColumn("first_name")
    table.dropColumn("last_name")
    table.dropColumn("mobile_number")
    table.dropColumn("reservation_date")
    table.dropColumn("reservation_time")
    table.dropColumn("people")
  })
};
