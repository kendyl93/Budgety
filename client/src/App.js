import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { getRequest } from './api';

import './App.scss';

import Login from './login/Login';
import Home from './Home/Home';
import { useCurrentUser } from './hooks';

const App = () => {
  const currentUser = useCurrentUser();

  console.log({ currentUser });

  return (
    <Router>
      <div>{currentUser ? <Home currentUser={currentUser} /> : <Login />}</div>
    </Router>
  );
};

export default App;
