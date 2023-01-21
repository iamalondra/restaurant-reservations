import { NavLink } from "react-router-dom";
import { updateReservation } from "../../utils/api";

export default function ReservationListItem({ reservation, onCancel }) {
  console.log("reservation", reservation);
  const handleCancel = async () => {
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
      const updatedReservation = {
        ...reservation,
        status: "cancelled",
      };
      try {
        await updateReservation({ data: updatedReservation });
        onCancel();
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <li>
      <div>
        <p>Name: {reservation.first_name}</p>
        <p>Number: {reservation.mobile_number}</p>
        <p>Status: {reservation.status}</p>
      </div>
      <div>
        {reservation.status === "seated" ? (
          <></>
        ) : (
          <NavLink to={`/reservations/${reservation.reservation_id}/seat`}>
            <button>seat</button>
          </NavLink>
        )}

        <NavLink to={`/reservations/${reservation.reservation_id}/edit`}>
          <button>edit</button>
        </NavLink>
        <button data-reservation-id-cancel={reservation.reservation_id} onClick={handleCancel}>
          cancel
        </button>
      </div>
    </li>
  );
}
