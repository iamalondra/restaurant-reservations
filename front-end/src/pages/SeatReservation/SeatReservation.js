import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../../layout/ErrorAlert";
import { singleReservation, listTables, seatReservation } from "../../utils/api";

function SeatReservation() {
  const [selectedTable, setSelectedTable] = useState("")
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [reservationError, setReservationError] = useState(null);
  const [error, setError] = useState()

  const history = useHistory();

  const { reservation_id } = useParams();
  useEffect(loadSeatReservation, [reservation_id]);

  function loadSeatReservation() {
    const abortController = new AbortController();
    const tablesAbortController = new AbortController();
    listTables({ occupied: false }, tablesAbortController.signal)
      .then(setTables)
      .catch(setTablesError);
    singleReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);
    return () => {
      tablesAbortController.abort();
      abortController.abort();
    };
  }

  const handleChange = ({target}) => {
    const value = target.value
    setSelectedTable(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!selectedTable){
      return
    }
    try {
      //call backend
      await seatReservation(reservation_id, selectedTable)
      //redirect to dashboard
      history.push("/dashboard")
    } catch (error) {
      //show error 
      setError(error.message)
    }
  }

  return (
    <main>
      <h1>Seat Reservation</h1>
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={reservationError} />
      <form onSubmit={handleSubmit}>
        <label>
          Table:
          <select onChange={handleChange} value={selectedTable}>
            {tables.map((table) => (
              <option key={table.table_id} value={table.table_id}>{table.table_name}</option>
            ))}
          </select>
        </label>
        <button type="submit">seat</button>
      </form>
    </main>
  );
}

export default SeatReservation;
