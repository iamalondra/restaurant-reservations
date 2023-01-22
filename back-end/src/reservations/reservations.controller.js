const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const moment = require("moment")

//TODO: make sure reservation date isn't a Tuesday
function closedOnTue(req, res, next){
  //get the date 
  const { reservation_date } = req.body.data;
  const date = moment(reservation_date).day();
  if(date === 2){
    return next({status: 400, message:"restaurant closed on tuesday"})
  }
  next();
}

//TODO: make sure the reservation isn't in the past
function reservationInPresent(req, res, next){
   //get the date from req.body.data
   const { reservation_date } = req.body.data;
   const date = moment(reservation_date, 'YYYY-MM-DD', true);
   const today = moment();
   //moment('2010-10-20').isBefore('2010-10-21'); // true
   if(date.isBefore(today)){
    return next({status: 400, message:"make reservation for the future"})
   }
   next();
}

//TODO: validate that the timeSlot selected is available 
async function timeSlotAvailable(req, res, next){
  //get reservation time and date
  const {reservation_time, reservation_date} = req.body.data
  const reservations = await service.getResByDate(reservation_date, reservation_time)
  const filteredReservations = reservations.filter((reservation) => reservation.reservation_id !== Number(req.params.reservation_id))
  if(filteredReservations.length === 0){
    return next();
  }
  return next({status: 400, message: "reservation_time is not available"})
}


//TODO: validate date
function dateIsValid(req, res, next) {
  //get the date from req.body.data
  const { reservation_date } = req.body.data;
  const date = moment(reservation_date, 'YYYY-MM-DD', true);
   //if true call next()
  if (date.isValid()) {
    return next();
  }
  //otherwise return next({status: 400, message: error message})
  return next({ status: 400, message: "reservation_date is invalid" });
}

//TODO: validate time
function timeIsValid(req, res, next) {
  //get the time input from the request body
  const { reservation_time } = req.body.data;
  const time = moment(reservation_time, 'H:mm:ss');
  if(time.isValid()){
   return next()
  }
  return next({status: 400, message: "reservation_time is invalid"})
}

//TODO: validate people is a number
function peopleIsNumber(req, res, next) {
  const { people } = req.body.data;
  //isNaN will return false if number is a string => check typeof
  if (isNaN(people)|| typeof people !== "number") {
    return next({ status: 400, message: "people must be a number" });
  }
  next();
}

//TODO: validate newReservation
//i might move this function into app.js and import it here
function bodyHasData(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

//TODO: validate reservation_id exists 
async function reservationExists(req, res, next) {
  const id = req.params.reservation_id;
  const reservation = await service.read(id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({ status: 404, message: `Reservation ${id} not found` });
}

//TODO: validate status as booked 
async function validateStatusBooked(req, res, next){
  const status = req.body.data.status
   if(status && status !== "booked"){
     return next({status: 400, message:`reservation status is ${status}`})
  }
   next();
}

//TODO: validates that the status is either booked, seated, or finished
async function validateStatus(req, res, next){
  const status = req.body.data.status
   if(status !== "booked" && status !== "seated" && status !== "finished" && status !== "cancelled"){
     return next({status: 400, message:`reservation status ${status} is invalid`})
  }
   next();
}

//TODO: validate that the current reservation isn't finished
function statusFinished(req, res, next){
  if(res.locals.reservation.status === "finished"){
    return next({status: 400, message: "reservation status is finished"})
  }
  next()
}

function isOpen(req, res, next){
  const reservationTime = req.body.data.reservation_time
  const formatString = "HH:mm:ss"
  const time = moment(reservationTime, formatString)
  //opens 10:30am
  const openingTime = moment("10:30:00", formatString)
  //closes 9:30pm
  const closingTime = moment("21:30:00", formatString)
  if(time.isSameOrBefore(closingTime) && time.isSameOrAfter(openingTime)){
    return next()
  }
  next({status: 400, message: `Cannot create reservation for ${reservationTime}`})
}


async function list(req, res) {
  const queryDate = req.query.date ?? ""
  const reservationMobile = req.query.mobile_number
  const data = await service.list(queryDate, reservationMobile);
  res.json({ data });
}

async function create(req, res, next) {
  const data = await service.create({
    ...req.body.data,
    status: "booked"
  });
  res.status(201).json({ data: data[0] });
}

async function read(req, res, next) {
  res.status(200).json({ data: res.locals.reservation });
}

async function update(req, res, next) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: Number(req.params.reservation_id),
  };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data });
}

async function destroy(req, res, next) {
  const data = await service.destroy(req.params.reservation_id);
  res.status(204).json({ data });
}



module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyHasData("first_name"),
    bodyHasData("last_name"),
    bodyHasData("mobile_number"),
    bodyHasData("reservation_date"),
    bodyHasData("reservation_time"),
    bodyHasData("people"),
    //bodyHasData("status"),
    dateIsValid,
    peopleIsNumber,
    timeIsValid,
    closedOnTue,
    isOpen, 
    reservationInPresent, 
    //timeSlotAvailable,
    validateStatusBooked,
    asyncErrorBoundary(create),
  ],
  read: [
    asyncErrorBoundary(reservationExists), 
    asyncErrorBoundary(read)
  ],
  update: [
    bodyHasData("first_name"),
    bodyHasData("last_name"),
    bodyHasData("mobile_number"),
    bodyHasData("reservation_date"),
    bodyHasData("reservation_time"),
    bodyHasData("people"),
    dateIsValid,
    peopleIsNumber,
    timeIsValid,
    closedOnTue,
    isOpen, 
    reservationInPresent, 
    // timeSlotAvailable,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update)
  ],
  destroy: [
    asyncErrorBoundary(reservationExists), 
    asyncErrorBoundary(destroy)
  ], 
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusFinished, 
    asyncErrorBoundary(validateStatus), 
    asyncErrorBoundary(update)
  ]
};
