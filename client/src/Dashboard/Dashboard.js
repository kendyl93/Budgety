import React, { useState } from 'react';

import { postRequest } from '../api';
import Groups from './Groups/Groups';

const create = data => postRequest('groups', data);

const onCreateGroup = async data => {
  try {
    await create(data);
  } catch (error) {
    console.error(error);
  }
};

const Dashboard = ({ allData: { currentUser, groups, users } }) => {
  const [name, setName] = useState('');

  const setGroupName = () => {
    const {
      target: { value }
    } = event;
    setName(value);
  };

  return (
    <div>
      <h1>Create group</h1>
      <form
        onSubmit={() => {
          currentUser && onCreateGroup({ user: currentUser, name });
        }}
      >
        <input onChange={setGroupName} type="text" />
        <input type="submit" value="Create" />
      </form>
      <h1>Your groups</h1>
      {groups && (
        <Groups currentUser={currentUser} groups={groups} users={users} />
      )}
    </div>
  );
};

export default Dashboard;
