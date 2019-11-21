import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import './App.scss';

import Login from './login/Login';
import Home from './Home/Home';

const { HOST_URI, REVERSE_PROXY_PORT, NODE_ENV } = window.process.env || {};

const FULL_HOST_URI =
  NODE_ENV === 'production'
    ? `http://${HOST_URI}/api`
    : `http://${HOST_URI}:${REVERSE_PROXY_PORT}/api`;

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(FULL_HOST_URI);
        setCurrentUser(result.data);
        console.log({ result: result.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div>{currentUser ? <Home currentUser={currentUser} /> : <Login />}</div>
    </Router>
  );
};

export default App;
