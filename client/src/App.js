import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './App.scss';

import Login from './login/Login';
import Home from './Home/Home';
import { useCurrentUser } from './hooks';

const App = () => {
  const currentUser = useCurrentUser();

  console.log({ currentUser });

  return (
    <Router>
      <div>
        {currentUser === undefined ? (
          <div>SPINNER</div>
        ) : currentUser === null ? (
          <Login />
        ) : (
          <Home currentUser={currentUser} />
        )}
      </div>
    </Router>
  );
};

export default App;
