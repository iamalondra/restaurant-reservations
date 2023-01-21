import { useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

function TableForm({ onSubmit, initialFormState }) {
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState("");

  const history = useHistory();

  const handleChange = ({ target }) => {
    console.log("handleChange");
    const value = target.value;
    console.log("value form", value);
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

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

  const handleCancel = () => {
    console.log("canceled");
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ErrorAlert error={error} />
      <label>
        Table name:
        <input
          id="table_name"
          name="table_name"
          type="text"
          onChange={handleChange}
          value={formData.table_name}
        />
      </label>
      <label>
        Table Capacity:
        <input
          id="capacity"
          name="capacity"
          type="number"
          onChange={handleChange}
          value={formData.capacity}
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

export default TableForm;
