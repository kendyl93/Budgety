import React from 'react';

import Navbar from '../Navbar';
import Main from '../Main';

const Home = ({ allData }) => {
  const { currentUser } = allData;

  return (
    <div className="home-container">
      <div className="navbar-container">
        <Navbar currentUser={currentUser} />
      </div>
      <div className="main-container">
        <Main allData={allData} />
      </div>
    </div>
  );
};

export default Home;
