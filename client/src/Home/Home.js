import React from 'react';

import Navbar from '../Navbar';
import Main from '../Main';

const Home = ({ currentUser }) => {
  return (
    <div className="home-container">
      <div className="navbar-container">
        <Navbar currentUser={currentUser} />
      </div>
      <div className="main-container">
        <Main />
      </div>
    </div>
  );
};

export default Home;
