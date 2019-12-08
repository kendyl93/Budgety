import React, { useEffect, useState } from 'react';
import { fetchData, postRequest } from '../api';
import { useCurrentUser } from '../hooks';

const GROUPS_ENSPOINT = 'groups';

const create = data => postRequest('groups', data);

const onCreateGroup = async data => {
  try {
    await create(data);
  } catch (error) {
    console.error(error);
  }
};

const Dashboard = () => {
  const [name, setName] = useState('');
  const [groups, setGroups] = useState([]);
  const currentUser = useCurrentUser();
  console.log({ groups, currentUser });

  useEffect(() => {
    fetchData(setGroups, GROUPS_ENSPOINT);
  }, []);

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
      <h2>Your groups</h2>
    </div>
  );
};

export default Dashboard;
