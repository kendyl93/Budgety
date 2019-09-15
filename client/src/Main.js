import React from 'react';

import Routes from './Routes';

const Main = () => (
  <div className="container">
    <h1>
      Budgety app <br />
      <small>
        This app is created to autmate my hommies budget calculations.
      </small>
    </h1>

    <Routes />
  </div>
);

export default Main;
