const knex = require("../db/connection")

function create(newTable){
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((result) => result[0])
}

//TODO: Sort by table_name
function list(free){
  const query = knex("tables")
  .select("*")
  .orderBy("table_name")

  console.log("free type", typeof free)
  console.log("free value", free)

  if(free !== undefined){
    if(free === "false"){
      //check the res_id column 
      query.whereNull("reservation_id")
    }else{
      query.whereNotNull("reservation_id")
    }
  }
  return query
}

function update(updatedSeat){
  return knex("tables")
  .select("*")
  .update(updatedSeat, "*")
  .where({table_id: updatedSeat.table_id})
  .returning("*")
}

function destroy(tableId){
  return knex("tables")
  .select("*")
  .where({table_id: tableId})
  .del()
}

//TODO: get reservations by reservationId
function read(tableId){
  return knex("tables")
  .select("*")
  .where({table_id: tableId})
  .first()
}



module.exports = {
  list, 
  create, 
  update, 
  destroy,
  read, 
}  