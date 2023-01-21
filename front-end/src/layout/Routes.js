import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import NewReservations from "../pages/NewReservations/NewReservations";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import SeatReservation from "../pages/SeatReservation/SeatReservation";
import EditReservation from "../pages/EditReservations/EditReservation";
import NewTable from "../pages/NewTables/NewTable";
import Search from "../pages/Search/Search";
import useQuery from "../hooks/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {

  const query = useQuery();

  const date = query.get("date") ?? today();

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <NewReservations />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
