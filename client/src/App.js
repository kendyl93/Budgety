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
        const result = await getRequest();
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
