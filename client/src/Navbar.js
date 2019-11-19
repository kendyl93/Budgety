import React from 'react';
import Link from './UI/Link';

const Navbar = () => (
  <div className="navbar-container">
    <nav>
      <Link className="navbar-brand" path="/">
        Budgety
      </Link>
      <div className="links">
        <Link path="/">Dashboard</Link>
        <Link path="/expences">Expences</Link>
        <Link path="/incomes">Incomes</Link>
        <Link path="/groups">New income</Link>
        <Link path="/settings">Settings</Link>
      </div>
    </nav>
  </div>
);

export default Navbar;
