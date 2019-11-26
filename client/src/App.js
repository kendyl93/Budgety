import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './App.scss';

import Spinner from './UI/Spinner';
import Login from './login/Login';
import Home from './Home/Home';
import { useCurrentUser } from './hooks';

const App = () => {
  const currentUser = useCurrentUser();
  const userNotLoadedYet = currentUser === undefined;
  const userNotSigned = currentUser === null;

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
          <Home currentUser={currentUser} />
        </div>
      )}
    </Router>
  );
};

export default App;
