import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";
import { createReservation } from "../../utils/api";

function ReservationForm({onSubmit, initialFormState}) {
  
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
      await onSubmit(formData)
      
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
      <form onSubmit={handleSubmit}>
       <ErrorAlert error={error}/> 
        <label>
          First name:
          <input
            id="first_name"
            name="first_name"
            type="text"
            onChange={handleChange}
            value={formData.first_name}
          />
        </label>
        <br />
        <label>
          Last name:
          <input
            id="last_name"
            name="last_name"
            type="text"
            onChange={handleChange}
            value={formData.last_name}
          />
        </label>
        <br />
        <label>
          Mobile number:
          <input
            id="mobile_number"
            name="mobile_number"
            type="tel"
            onChange={handleChange}
            value={formData.mobile_number}
          />
        </label>
        <label>
          Date of reservation:
          <input
            id="reservation_date"
            name="reservation_date"
            type="date"
            onChange={handleChange}
            value={formData.reservation_date}
          />
        </label>
        <label>
          Time of reservation:
          <input
            id="reservation_time"
            name="reservation_time"
            type="time"
            onChange={handleChange}
            value={formData.reservation_time}
          />
        </label>
        <br />
        <label>
          Number of people:
          <input
            id="people"
            name="people"
            type="number"
            onChange={handleChange}
            value={formData.people}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="reset" onClick={handleCancel}>
          Cancel
        </button>
      </form>
  );
}

export default ReservationForm;
