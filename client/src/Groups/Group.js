import React from 'react';

const GroupMembers = ({ members, users }) => (
  <div>
    {members.map(member => {
      const { name } = users[member];
      return <div key={member}>{name}</div>;
    })}
  </div>
);

const Group = ({ name, members, users }) => (
  <div>
    <h2>Group name: {name}</h2>
    <h3>Members:</h3>
    {members && members.length > 0 && (
      <GroupMembers members={members} users={users} />
    )}
  </div>
);

export default Group;
