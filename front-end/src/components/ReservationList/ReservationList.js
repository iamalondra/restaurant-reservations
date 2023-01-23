import ReservationListItem from "../ReservationListItem/ReservationListItem";
import "./ReservationList.css"

export default function ReservationList({ reservations, onCancel, currentDate }) {
  if (reservations.length === 0) {
    return <p className="alert alert-secondary mt-3 px-3 h5">No reservations found</p>;
  }
  return (
    <ul className="reservation-list-container list-unstyled p-3 mh-80 rounded">
      {reservations.map((reservation) => (
        <ReservationListItem
          key={reservation.reservation_id}
          reservation={reservation}
          onCancel={onCancel}
          currentDate={currentDate}
        />
      ))}
    </ul>
  );
}
