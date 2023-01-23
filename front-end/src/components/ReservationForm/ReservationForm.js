import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";
import "./ReservationForm.css";

function ReservationForm({ onSubmit, initialFormState }) {
  //TODO: write  a use state for the formData
  const [formData, setFormData] = useState({ ...initialFormState });

  //you cant use react hooks in a non react function/component
  const history = useHistory();

  const [error, setError] = useState("");

  //TODO: write a handel change function
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  //TODO: write a submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //const newReservation = await createReservation({data: formattedFormData});
      await onSubmit(formData);
    } catch (error) {
      console.log(error.message);
      setError(error);
    }
  };

  //TODO: write a cancel handler + return to previous page
  //goBack() - (function) Equivalent to go(-1)
  const handleCancel = () => {
    console.log("canceled");
    history.goBack();
  };

  return (
    <>
      <h1>New Reservation</h1>
      <ErrorAlert error={error} />
      <form
        className="reservation-form rounded p-3 mb-3 d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <div className="row m-0">
          <div className="form-group col-xs-4 col-sm-6 p-0 pr-sm-2">
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              className="form-control"
              onChange={handleChange}
              placeholder="first name"
              value={formData.first_name}
            />
          </div>
          <div className="form-group col-xs-4 col-sm-6 p-0 pr-sm-2">
            <label htmlFor="last_name">Last name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              className="form-control"
              onChange={handleChange}
              placeholder="last name"
              value={formData.last_name}
            />
          </div>
        </div>
        <div className="row m-0">
          <div className="form-group col-xs-4 col-sm-6 p-0 pr-sm-2">
            <label htmlFor="mobile_number">Mobile number</label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="tel"
              className="form-control"
              onChange={handleChange}
              placeholder="mobile number"
              value={formData.mobile_number}
            />
          </div>
          <div className="form-group col-xs-4 col-sm-6 p-0 pr-sm-2">
            <label htmlFor="people">Number of people</label>
            <input
              id="people"
              name="people"
              type="number"
              className="form-control"
              onChange={handleChange}
              placeholder="number of people"
              value={formData.people}
            />
          </div>
        </div>

        <div className="row m-0">
          <div className="form-group col-xs-4 col-sm-6 p-0 pr-sm-2">
            <label htmlFor="reservation_date">Date of reservation</label>
            <input
              id="reservation_date"
              name="reservation_date"
              type="date"
              className="form-control"
              onChange={handleChange}
              placeholder="reservation date"
              value={formData.reservation_date}
            />
          </div>
          <div className="form-group col-xs-4 col-sm-6 p-0 pr-sm-2">
            <label htmlFor="reservation_time">Time of reservation</label>
            <input
              id="reservation_time"
              name="reservation_time"
              type="time"
              className="form-control"
              onChange={handleChange}
              placeholder="reservation time"
              value={formData.reservation_time}
            />
          </div>
        </div>
        <div className="d-flex">
          <button className="reservation-btn btn btn-primary mr-2" type="submit">Submit</button>
          <button className="reservation-btn btn btn-danger" type="reset" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default ReservationForm;
