import React from 'react';

import Navbar from '../Navbar';
import Main from '../Main';

const Home = ({ currentUser }) => {
  return (
    <div>
      <h1>Hello, {currentUser && currentUser.name}</h1>
      <div>
        <Navbar />
      </div>
      <div>
        <Main />
      </div>
    </div>
  );
};

export default Home;
