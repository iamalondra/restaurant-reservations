import { NavLink } from "react-router-dom";
import { updateReservation } from "../../utils/api";
import { today, next } from "../../utils/date-time";
import moment from "moment";

export default function ReservationListItem({
  reservation,
  onCancel,
  currentDate,
}) {
  const handleCancel = async () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
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

  //currentDate is string
  //turn current date into a moment (i will potentially need to use .toDate())
  console.log("current date", currentDate);

  let date = moment(currentDate, "YYYY-MM-DD");
  console.log("date is after", date.startOf("day").isAfter(moment().startOf("day")))
  console.log("date is before", date.startOf("day").isBefore(moment().startOf("day")))

  //if the day is today && reservation !seated => show seated btn

  //if date future => show edit btn
  //if date future => show cancel btn

  return (
    <li className="reservation-list-item card bg-light p-2 mb-3">
      <div className="row justify-content-between m-0">
        <div className="d-flex align-items-md-center reservation-info col-lg-6 p-0 pr-sm-2 mb-2 mb-lg-0 flex-column flex-md-row">
          <p className="m-0 mr-5 w-25">{reservation.first_name}</p>
          <p className="m-0 mr-5 text-nowrap">{reservation.mobile_number}</p>
          <p
            className="m-0 mr-5 w-25"
            data-reservation-id-status={reservation.reservation_id}
          >
            Status: {reservation.status}
          </p>
          <p className="m-0">People: {reservation.people}</p>
        </div>
        <div className="d-flex align-items-center reservation-info col-lg-6 p-0 pr-sm-2 justify-content-lg-end w-100">
          {reservation.status === "seated" || !date.startOf("day").isSame(moment().startOf("day")) ? (
            <></>
          ) : (
            <NavLink to={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-primary mr-2">seat</button>
            </NavLink>
          )}

          {date.startOf("day").isAfter(moment().startOf("day")) && (
            <NavLink to={`/reservations/${reservation.reservation_id}/edit`}>
              <button className="btn btn-secondary mr-2">edit</button>
            </NavLink>
          )}

          {date.startOf("day").isAfter(moment().startOf("day")) && (
            <button
              className="btn btn-danger"
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={handleCancel}
            >
              cancel
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
