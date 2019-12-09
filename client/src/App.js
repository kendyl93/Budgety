import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './App.scss';

import Spinner from './UI/Spinner';
import Login from './login/Login';
import Home from './Home/Home';
import { useDatabaseData } from './hooks';

const App = () => {
  const allData = useDatabaseData();
  const userNotLoadedYet = allData === undefined;
  const userNotSigned = allData === null;

  return (
    <Router>
      {userNotLoadedYet ? (
        <Spinner />
      ) : userNotSigned ? (
        <div>
          <Login />
        </div>
      ) : (
        <div>
          <Home allData={allData} />
        </div>
      )}
    </Router>
  );
};

export default App;
