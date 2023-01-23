import { useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

function TableForm({ onSubmit, initialFormState }) {
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState("");

  const history = useHistory();

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //const newReservation = await createReservation({data: formattedFormData});
      if (formData.table_name && formData.capacity && formData.capacity > 0) {
        await onSubmit(formData);
      } else {
        throw new Error("invalid formData");
      }
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
    <>
      <ErrorAlert error={error} />
      <form
        className="search-form rounded p-3 mb-3 d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <div className="row m-0">
          <div className="form-group col-xs-4 col-sm-6 p-0 pr-sm-2">
            <label htmlFor="table_name">Table name:</label>
            <input
              id="table_name"
              className="form-control"
              name="table_name"
              type="text"
              placeholder="Table name"
              onChange={handleChange}
              value={formData.table_name}
            />
          </div>
          <div className="form-group col-xs-4 col-sm-6 p-0 pr-sm-2">
            <label htmlFor="table_name">Table Capacity:</label>
            <input
              id="capacity"
              className="form-control"
              name="capacity"
              type="number"
              placeholder="Table capacity"
              onChange={handleChange}
              value={formData.capacity}
            />
          </div>
        </div>
        <div className="row m-0">
          <button className="table-form-btn btn btn-primary mr-2" type="submit">
            Submit
          </button>
          <button
            className="table-form-btn btn btn-secondary"
            type="reset"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default TableForm;
