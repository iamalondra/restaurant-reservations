import React, { useState } from 'react'
import ReservationList from '../../components/ReservationList/ReservationList'
import SearchForm from '../../components/SearchForm/SearchForm'
import { listReservations } from '../../utils/api'

//search form just needs on submit prop 
//state: resList = results of search form 
//children: SearchForm and ResList component

function Search() {
  const [reservations, setReservations] = useState([])

  //create handleSearch
  const handleSearch = async (phoneNumber) => {
    //call the api with the search
    const result = await listReservations({mobile_number: phoneNumber})
    //should return a list of res
    setReservations(result)
  }

  return (
    <main>
      <h1>Search</h1>
      <SearchForm onSubmit={handleSearch} />
      <ReservationList reservations={reservations} />
    </main>
  )
}

export default Search