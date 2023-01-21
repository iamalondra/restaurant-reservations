import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import ErrorAlert from "../../layout/ErrorAlert";
import { singleReservation, updateReservation } from "../../utils/api";

function EditReservation() {
  const [reservation, setReservation] = useState();
  const [reservationError, setReservationError] = useState(null);

  const { reservation_id } = useParams();

  const history = useHistory();

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    singleReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);

    return () => {
      abortController.abort();
    };
  }

  console.log("reservation edit", reservation);
  const handleSubmit = async (formData) => {
    //update the reservation req to the backend
    await updateReservation({ data: formData });
    //send to previous
    history.goBack();
  };

  return (
    <main>
      <h1>Edit Reservation</h1>
      <ErrorAlert error={reservationError} />
      {reservation && (
        <ReservationForm
          initialFormState={{
            ...reservation,
            reservation_date: reservation.reservation_date.split("T")[0],
          }}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

export default EditReservation;
