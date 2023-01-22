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
      <TableForm initialFormState={initialFormState} onSubmit={handleSubmit} />
    </main>
  )
}

export default NewTable