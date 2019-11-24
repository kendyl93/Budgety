import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { getRequest } from './api';

import './App.scss';

import Login from './login/Login';
import Home from './Home/Home';

const App = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } = {} } = await getRequest();

        setCurrentUser(user);

        console.log({ user });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log({ currentUser });

  return (
    <Router>
      <div>{currentUser ? <Home currentUser={currentUser} /> : <Login />}</div>
    </Router>
  );
};

export default App;
