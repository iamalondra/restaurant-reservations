import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import ReservationList from "../../components/ReservationList/ReservationList";
import TablesList from "../../components/TablesList/TablesList.js";
import { NavLink } from "react-router-dom";
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
    const newDate = previous(currentDate);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = next(currentDate);
    setCurrentDate(newDate);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {currentDate}</h4>
      </div>
      <div>
        <button onClick={handlePrevious}>previous</button>
        <button onClick={handleToday}>today</button>
        <button onClick={handleNext}>next</button>
      </div>
      <ReservationList
        reservations={reservations}
        onCancel={loadDashboard}
        currentDate={currentDate}
      />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>
      <TablesList tables={tables} onFinish={loadDashboard}/>
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
