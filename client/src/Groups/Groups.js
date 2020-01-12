import React from 'react';
import Create from './Create';
import Link from '../UI/Link';

const Group = ({ name = '', id }) => {
  const path = `/groups/${id}`;

  return (
    <div className="group">
      <Link path={path}>
        <h2>name: {name}</h2>
        <h3>Description:</h3>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </Link>
    </div>
  );
};

export const GroupList = ({ invited = false, groups, currentUser, users }) => {
  const userGroupsIds = invited
    ? currentUser.groupsInvitedTo
    : currentUser.groupsMember;

  return userGroupsIds.map(groupId => {
    const { name, members = [] } = groups[groupId] || {};

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
