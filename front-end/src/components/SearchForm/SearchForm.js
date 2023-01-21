import React, { useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";


function SearchForm({ onSubmit }) {

  const [search, setSearch] = useState("")
  const [error, setError] = useState("")

  //needs a handle submit
  const handleSubmit = async (event) =>{
    event.preventDefault();
    try {
      await onSubmit(search)
    } catch (error) {
      setError(error)
    }
  }

  //needs a handle change
  const handleChange = ({target}) => {
    const value = target.value;
    setSearch(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorAlert error={error} />
      <label>
        Phone Number:
        <input
          id="mobile_number"
          name="mobile_number"
          type="tel"
          onChange={handleChange}
          value={search}
          placeholder="Enter a customer's phone number"
        />
      </label>
      <br />
      <button type="submit">Find</button>
    </form>
  );
}

export default SearchForm;
