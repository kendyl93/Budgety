import React, { useState } from 'react';
import { postRequest } from '../api';

const create = data => postRequest('groups', data);

const onCreateGroup = async data => {
  try {
    await create(data);
  } catch (error) {
    console.error(error);
  }
};

const GroupMembers = ({ members, users }) => (
  <div>
    {members.map(member => {
      const { name } = users[member];
      return <div key={member}>{name}</div>;
    })}
  </div>
);

const Group = ({ key, name, members, users }) => (
  <div key={key}>
    <h2>Group name: {name}</h2>
    <h3>Members:</h3>
    {members && members.length > 0 && (
      <GroupMembers members={members} users={users} />
    )}
  </div>
);

const Groups = ({ groups, currentUser, users }) => {
  const userGroupsIds = currentUser.groups_member;

  return userGroupsIds.map(groupId => {
    const { name, members = [] } = groups[groupId];

    console.log({ parent: members });

    return <Group key={groupId} members={members} name={name} users={users} />;
  });
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
