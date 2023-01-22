import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import { createReservation } from "../../utils/api";

function NewReservations() {
  //TODO: create an initialFormState => firstName, lastName, mobileNumber, dateOfReservation, timeOfReservation, numberOfPeople
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  //you cant use react hooks in a non react function/component
  const history = useHistory();

  //TODO: write a submit handler
  const handleSubmit = async (formData) => {
    
    const data = {
      ...formData,
      status: "booked",
      people: Number(formData.people)
    };

    const newReservation = await createReservation({ data });
    history.push(`/dashboard?date=${newReservation.reservation_date}`);
  };

  return (
    <main>
      <ReservationForm
        onSubmit={handleSubmit}
        initialFormState={initialFormState}
      />
    </main>
  );
}

export default NewReservations;
