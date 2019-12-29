import React from 'react';
import Create from './Create';
import Link from '../UI/Link';

const GroupMembers = ({ members, users }) => (
  <div>
    {members.map(member => {
      const { name = '' } = users[member] || {};
      return <div key={member}>{name}</div>;
    })}
  </div>
);

const Group = ({ name = '', id, members, users }) => {
  const path = `/groups/${id}`;

  return (
    <div className="group">
      <Link path={path}>
        <h2>name: {name}</h2>
        <h3>Members:</h3>
        {members && members.length > 0 && (
          <GroupMembers members={members} users={users} />
        )}
      </Link>
    </div>
  );
};

export const GroupList = ({ invited = false, groups, currentUser, users }) => {
  const userGroupsIds = invited
    ? currentUser.groupsInvitedTo
    : currentUser.groupsMember;
  console.log({ userGroupsIds });
  return userGroupsIds.map(groupId => {
    console.log({ groups, currentUser, users });
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
