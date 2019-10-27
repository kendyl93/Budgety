import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import './App.scss';

import Navbar from './Navbar';
import Main from './Main';

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          'http://localhost:5470/api/users/current'
        );

        setCurrentUser(result.data);
        console.log({ result });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="container-fluid">
        <h1>Hello, {currentUser && currentUser.name}</h1>
        <Navbar />
        <Main />
      </div>
    </Router>
  );
};

export default App;
