import React, { useState } from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <div className="d-flex justify-content-between w-100">
          <Link
            className="navbar-brand d-flex align-items-center sidebar-brand m-0"
            to="/"
          >
            <div className="sidebar-brand-text mx-2">
              <span>Periodic Tables</span>
            </div>
          </Link>
          <div className="p-2">
            <button
              className="d-md-none menu-btn rounded-circle px-3 py-2"
              onClick={handleClick}
            >
              X
            </button>
          </div>
        </div>

        <hr className="sidebar-divider my-0" />
        <ul
          className="menu-list nav navbar-nav text-light d-md-none"
          style={{ height: open ? "fit-content" : "0px" }}
          id="accordionSidebar"
        >
          <li className="menu-item nav-item rounded p-2">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="menu-item nav-item rounded p-2">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="menu-item nav-item rounded p-2">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="menu-item nav-item rounded p-2">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>

        <ul
          className="menu-list nav navbar-nav text-light d-none d-md-block"
          id="accordionSidebar"
        >
          <li className="menu-item nav-item rounded p-2">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="menu-item nav-item rounded p-2">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="menu-item nav-item rounded p-2">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="menu-item nav-item rounded p-2">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>

        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
