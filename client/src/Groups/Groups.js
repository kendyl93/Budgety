import React from 'react';
import Group from './Group';
import Create from './Create';

const GroupList = ({ groups, currentUser, users }) => {
  const userGroupsIds = currentUser.groupsMember;

  return userGroupsIds.map(groupId => {
    const { name, members = [] } = groups[groupId];

    return (
      <Group
        id={groupId}
        key={groupId}
        members={members}
        name={name}
        users={users}
      />
    );
  });
};

const Groups = ({ allData: { currentUser, groups, users } }) => {
  return (
    <div>
      <Create currentUser={currentUser} />

      <h1>Your groups</h1>
      {groups && (
        <div className="groups-wrapper col-spacing row-spacing">
          <GroupList currentUser={currentUser} groups={groups} users={users} />
        </div>
      )}
    </div>
  );
};

export default Groups;
