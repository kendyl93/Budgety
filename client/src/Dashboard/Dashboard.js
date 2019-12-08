import React, { useState } from 'react';
import { postRequest } from '../api';

const create = data => postRequest('group', data);

const onCreateGroup = async name => {
  try {
    console.log({ name });
    // await create(name);
  } catch (error) {
    console.error(error);
  }
};

const Dashboard = () => {
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
          onCreateGroup(name);
        }}
      >
        <input onChange={setGroupName} type="text" />
        <input type="submit" value="Create" />
      </form>
      <h2>Your groups</h2>
    </div>
  );
};

export default Dashboard;
