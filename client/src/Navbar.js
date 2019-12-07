import React from 'react';

import Link from './UI/Link';
import {
  Home as DashboardIcon,
  MoneyOff as ExpencesIcon,
  AttachMoney as IncomesIcon,
  SettingsApplication as SettingsIcon
} from './UI/icons';
import { getRequest } from './api';

const Navbar = ({ currentUser }) => (
  <div className="navbar-container">
    <nav>
      <Link path="/">Budgety</Link>

      <div>
        <h1>Hello, {currentUser && currentUser.name}</h1>
      </div>
      <div className="links row-spacing-half">
        <Link path="/">
          <div className="link col-spacing">
            <DashboardIcon />
            <div>Dashboard</div>
          </div>
        </Link>
        <Link path="/expences">
          <div className="link col-spacing">
            <ExpencesIcon />
            <div>Expences</div>
          </div>
        </Link>
        <Link path="/incomes">
          <div className="link col-spacing">
            <IncomesIcon />
            <div>Incomes</div>
          </div>
        </Link>
        <Link path="/settings">
          <div className="link col-spacing">
            <SettingsIcon />
            <div>Settings</div>
          </div>
        </Link>
        <div
          onClick={async () => {
            try {
              await getRequest('logout');
              location.reload();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <div className="link col-spacing">
            <div>Logout</div>
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
