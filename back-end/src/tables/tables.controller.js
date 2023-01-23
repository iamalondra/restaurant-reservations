const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const resService = require("../reservations/reservations.service");
const moment = require("moment")

//TODO: validate newTable
function bodyHasData(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

//TODO: returns 400 if table_name is missing, is empty, is one character
function validateTableName(req, res, next) {
  const { table_name } = req.body.data;
  if (!table_name || table_name.length <= 1) {
    return next({ status: 400, message: "table_name must be present" });
  }
  next();
}

//TODO: check if table id is occupied
async function tableNotOccupied(req, res, next) {
  if (!res.locals.table.reservation_id) {
    return next({
      status: 400,
      message: `table ${res.locals.table.table_id} is not occupied`,
    });
  }
  const reservation = await resService.read(res.locals.table.reservation_id);
  res.locals.reservation = reservation;
  next();
}

//TODO: returns 400 if capacity is missing, is zero, is not a number => returns 200 if table has sufficient capacity
function validateCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (isNaN(capacity) || typeof capacity !== "number") {
    return next({ status: 400, message: "capacity must be a number" });
  }
  next();
}

//TODO: seatAvailability => validate table is not at capacity or if it is
function seatAvailability(req, res, next) {
  const { table, reservation } = res.locals;
  if (table.capacity < reservation.people) {
    return next({
      status: 400,
      message: `table ${table.table_id} insufficient capacity`,
    });
  }
  next();
}

//TODO: returns 404 if reservation_id does not exist
async function tableExists(req, res, next) {
  const id = req.params.table_id;
  const table = await service.read(id);
  const tables = await service.list();
  if (table) {   
    res.locals.table = table;
    return next();
  }
  return next({ status: 404, message: `table ${id} not found` });
}

//TODO: returns 400 if table is occupied
function tableOccupied(req, res, next) {
  if (res.locals.table.reservation_id) {
    return next({
      status: 400,
      message: `table ${res.locals.table.table_id} is occupied`,
    });
  }
  next();
}


async function reservationExists(req, res, next) {
  const id = req.body.data.reservation_id;
  const reservation = await resService.read(id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({ status: 404, message: `reservation ${id} not found` });
}

async function isReservationToday(req, res, next){
  const date = moment(res.locals.reservation.reservation_date, "YYYY-MM-DD")
  let today = moment().startOf("day")
  if(date.startOf("day").isSame(today)){
    return next()
  }
  return next({status:400, message: `can only seat reservations for ${today.format("LL")}. This reservation is for ${date.format("LL")}`})
}

//TODO: check if reservation is seated 
async function seat(req, res, next){
  const status = res.locals.reservation.status
  if(status === "seated"){
    return next({status: 400, message: "reservation is already seated"})
  }
  return next();
}

//TODO: update reservation status 

async function read(req, res, next) {
  res.status(200).json({ data: res.locals.reservation });
}

async function list(req, res, next) {
  const free = req.query.occupied
  const data = await service.list(free);
  res.json({ data });
}


async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const updatedSeat = {
    ...req.body.data,
    table_id: Number(req.params.table_id),
  };

  const updatedStatus = {
    ...res.locals.reservation, 
    status: "seated"
  }

  const data = await service.update(updatedSeat);
  await resService.update(updatedStatus)

  res.status(200).json({ data });
}

async function destroy(req, res, next) {
  const updatedSeat = {
    table_id: Number(req.params.table_id),
    reservation_id: null,
  };

  const data = await service.update(updatedSeat);

  const updatedStatus = {
    ...res.locals.reservation, 
    status: "finished"
  }

  await resService.update(updatedStatus)
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyHasData("table_name"),
    bodyHasData("capacity"),
    validateTableName,
    validateCapacity,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  update: [ 
    asyncErrorBoundary(tableExists),
    bodyHasData("reservation_id"),
    asyncErrorBoundary(reservationExists),
    seatAvailability,
    tableOccupied,
    isReservationToday,
    seat, 
    asyncErrorBoundary(update),
  ],
  destroy: [ 
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableNotOccupied), 
    asyncErrorBoundary(destroy)
  ],
};
