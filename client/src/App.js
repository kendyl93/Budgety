import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import './App.scss';

import Navbar from './Navbar';
import Main from './Main';

import Login from './login/Login';

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5470/api');
        setCurrentUser(result.data);
        console.log({ result: result.data });
      } catch (error) {
        console.error(error);
        history.push('/login'); //need to be fixed
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="container-fluid">
        {currentUser ? (
          <div>
            <h1>Hello, {currentUser && currentUser.name}</h1>
            <Navbar />
            <Main />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
};

export default App;
