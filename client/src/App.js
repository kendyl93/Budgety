import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import './App.scss';

import Navbar from './Navbar';
import Main from './Main';

const App = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5470/api/users');
      setUsers(result.data);
      console.log({ result });
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="container-fluid">
        <h1>Hello, {users && users[0].name}</h1>
        <Navbar />
        <Main />
      </div>
    </Router>
  );
};

export default App;
