import React from 'react'
import TableForm from '../../components/TableForm/TableForm'
import { createTable } from '../../utils/api'
import { useHistory } from "react-router-dom";


function NewTable() {
  const history = useHistory();

  const initialFormState={
    table_name:"", 
    capacity: ""
  }

  const handleSubmit = async (formData) => {
    const data = {
      ...formData,
      capacity: Number(formData.capacity),
    };

    const newTable = await createTable({data})
    history.push("/dashboard")
  }
  return (
    <main>
      <h1>New Table</h1>
      <TableForm initialFormState={initialFormState} onSubmit={handleSubmit} />
    </main>
  )
}

export default NewTable