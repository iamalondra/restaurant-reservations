import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../components/ReservationList/ReservationList";
import TablesList from "../../components/TablesList/TablesList.js";
import { today, next, previous } from "../../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date);

  useEffect(loadDashboard, [currentDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    const tablesAbortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables({}, tablesAbortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => {
      tablesAbortController.abort();
      abortController.abort();
    };
  }

  const handleToday = () => {
    setCurrentDate(today());
  };

  const handlePrevious = () => {
    let splitDate = currentDate
    if(currentDate.includes("T")){
       splitDate = currentDate.split("T")[0]
    }
    const newDate = previous(splitDate);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    let splitDate = currentDate
    if(currentDate.includes("T")){
       splitDate = currentDate.split("T")[0]
    }
    const newDate = next(splitDate);
    setCurrentDate(newDate);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h2 className="mb-0">Reservations for {currentDate?.includes("T") ? currentDate.split("T")[0] : currentDate}</h2>
      </div>
      <div className="mb-3">
        <button onClick={handlePrevious} className="btn btn-light mr-2">previous</button>
        <button onClick={handleToday} className="btn btn-light mr-2">today</button>
        <button onClick={handleNext} className="btn btn-light">next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationList
        reservations={reservations}
        onCancel={loadDashboard}
        currentDate={currentDate}
      />
      <TablesList tables={tables} error={tablesError} onFinish={loadDashboard} />
     
   
    </main>
  );
}

export default Dashboard;
