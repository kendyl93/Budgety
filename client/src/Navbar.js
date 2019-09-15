import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">
      Budgety
    </Link>
    <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="nav-link" to="/create">
            Create
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
