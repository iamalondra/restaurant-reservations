const knex = require("../db/connection")

function list(queryDate, reservationMobile){
  const query =  knex("reservations")
    .select("*")
    .whereNot({status: "finished"})
    .orderBy("reservation_date", "asc")

    if(queryDate){
      query.where({reservation_date: queryDate})
    }

    if(reservationMobile){
      query.where("mobile_number", "like", `%${reservationMobile.replace(/\D/g, "")}%`)
    }
    
    return query;
}

function create(newReservation){
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
}

function read(reservationId){
  return knex("reservations")
    .select("*")
    .where({reservation_id: reservationId})
    .first()
}

function update(updatedReservation){
  return knex("reservations")
  .select("*")
  .update(updatedReservation, "*")
  .where({reservation_id: updatedReservation.reservation_id})
  .returning("*")
  .then((results) => results[0])
}

function destroy(reservationId){
  return knex("reservations")
    .where({reservation_id: reservationId})
    .del()
}

function getResByDate(reservationDate, reservationTime){
  return knex("reservations")
  .select("*")
  .where({reservation_date: reservationDate })
  .andWhere({reservation_time: reservationTime})
}


//TODO: get tables by status
function tableStatus(reservationId){
  return knex("reservations")
  .select("status")
  .where({"reservation_id": reservationId})
}

module.exports = {
  list, 
  create, 
  read, 
  update,
  destroy, 
  getResByDate, 
  tableStatus
}