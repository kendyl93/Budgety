import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';

const history = createBrowserHistory();

import './App.scss';

import Navbar from './Navbar';
import Main from './Main';

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const result = await axios.get('http://localhost:5470/api');
      //   setCurrentUser(result.data);
      //   console.log({ result });
      // } catch (error) {
      //   console.error(error);
      //   history.push('#/login');
      // }
    };
    fetchData();
  }, []);

  return (
    <Router history={history}>
      <div className="container-fluid">
        <h1>Hello, {currentUser && currentUser.name}</h1>
        <Navbar />
        <Main />
      </div>
    </Router>
  );
};

export default App;
