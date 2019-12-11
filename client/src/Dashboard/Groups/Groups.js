import React from 'react';
import Group from './Group';

const Groups = ({ groups, currentUser, users }) => {
  const userGroupsIds = currentUser.groupsMember;

  return userGroupsIds.map(groupId => {
    const { name, members = [] } = groups[groupId];

    return <Group key={groupId} members={members} name={name} users={users} />;
  });
};

export default Groups;
