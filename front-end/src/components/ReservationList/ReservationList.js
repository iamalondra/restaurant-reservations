import ReservationListItem from "../ReservationListItem/ReservationListItem";

export default function ReservationList({ reservations, onCancel, currentDate }) {
  if (reservations.length === 0) {
    return <p>There are no reservations for {currentDate} </p>;
  }
  return (
    <ul>
      {reservations.map((reservation) => (
        <ReservationListItem
          key={reservation.reservation_id}
          reservation={reservation}
          onCancel={onCancel}
        />
      ))}
    </ul>
  );
}
