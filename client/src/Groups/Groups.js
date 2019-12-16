import React from 'react';
import Group from './Group';
import Create from './Create';

const GroupList = ({ groups, currentUser, users }) => {
  const userGroupsIds = currentUser.groupsMember;

  return userGroupsIds.map(groupId => {
    const { name, members = [] } = groups[groupId];

    return <Group key={groupId} members={members} name={name} users={users} />;
  });
};

const Groups = ({ allData: { currentUser, groups, users } }) => {
  return (
    <div>
      <Create currentUser={currentUser} />

      <h1>Your groups</h1>
      {groups && (
        <GroupList currentUser={currentUser} groups={groups} users={users} />
      )}
    </div>
  );
};

export default Groups;
