/*
const dropColumn = (knex, tableName, columnName) => {
    // knex does not have a dropColumnIfExists :\
    return knex.schema.hasColumn(tableName, columnName).then((hasColumn) => {
        if(hasColumn) {
            return knex.schema.alterTable(tableName, table => {
                table.dropColumn(columnName)    
            })
        } else {
            return null
        }
    })
}
*/

exports.up = function (knex) {
  return knex.schema.alterTable("reservations", (table) => {
    table.varchar("status").notNullable().defaultTo("booked").alter();
  });
};

exports.down = function (knex) {
  // return knex.schema.alterTable("reservations", table => {
  //   table.dropColumn("status")
  // })
  return knex.schema.hasColumn("reservations", "status").then((hasColumn) => {
    console.log("has column", hasColumn)
    if (hasColumn) {
      return knex.schema.alterTable("reservations", (table) => {
        table.dropColumn("status");
      });
    } else {
      return null;
    }
  });
};
