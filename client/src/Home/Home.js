import React from 'react';

import Navbar from '../Navbar';
import Main from '../Main';

import './Home.scss';

const Home = ({ currentUser }) => {
  return (
    <div className="home-container">
      {/* <h1>Hello, {currentUser && currentUser.name}</h1> */}
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="main-container">
        <Main />
      </div>
    </div>
  );
};

export default Home;
