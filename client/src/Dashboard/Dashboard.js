import React from 'react';

import Groups from './Groups/Groups';
import Create from './Groups/Create';

const Dashboard = ({ allData: { currentUser, groups, users } }) => {
  return (
    <div>
      <Create currentUser={currentUser} />

      <h1>Your groups</h1>
      {groups && (
        <Groups currentUser={currentUser} groups={groups} users={users} />
      )}
    </div>
  );
};

export default Dashboard;
