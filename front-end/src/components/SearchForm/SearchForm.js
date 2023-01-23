import React, { useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";
import "./SearchForm.css";

function SearchForm({ onSubmit }) {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  //needs a handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSubmit(search);
    } catch (error) {
      setError(error);
    }
  };

  //needs a handle change
  const handleChange = ({ target }) => {
    const value = target.value;
    setSearch(value);
  };

  return (
    <>
      <ErrorAlert error={error} />
      <form
        className="search-form rounded p-3 mb-3 d-flex align-items-end"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="mobile_number">Phone Number</label>
          <input
            type="tel"
            name="mobile_number"
            id="mobile_number"
            className="form-control"
            onChange={handleChange}
            value={search}
            placeholder="Enter a customer's phone number"
          />
        </div>
        <button className="search-btn btn btn-primary ml-2 mb-3" type="submit">
          Find
        </button>
      </form>
    </>
  );
}

export default SearchForm;
