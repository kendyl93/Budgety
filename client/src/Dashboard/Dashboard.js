import React, { useEffect, useState } from 'react';
import { fetchData, postRequest } from '../api';
import { useDatabaseData } from '../hooks';

const GROUPS_ENSPOINT = 'groups';

const create = data => postRequest('groups', data);

const onCreateGroup = async data => {
  try {
    await create(data);
  } catch (error) {
    console.error(error);
  }
};

const GroupMembers = ({ members }) => {
  return (
    <div>
      {members.map(member => {
        return <div key={member}>{member}</div>;
      })}
    </div>
  );
};

const Groups = ({ groups, currentUser }) => {
  console.log({ currentUser });
  const userGroupsIds = currentUser.groups_member;
  
  return userGroupsIds.map(groupId => (
    <div key={groupId}>
      <h2>Group name: {groups[groupId].name}</h2>
      <h3>Members:</h3>
      {groups[groupId].members && groups[groupId].members.length > 0 && (
        <GroupMembers members={groups[groupId].members} />
      )}
    </div>
  ));
};

const Dashboard = ({ allData: { currentUser, groups } }) => {
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
      {console.log({ groups })}

      <Groups currentUser={currentUser} groups={groups} />
    </div>
  );
};

export default Dashboard;
