import React from 'react';

import Link from '../UI/Link';

const GroupMembers = ({ members, users }) => (
  <div>
    {members.map(member => {
      const { name } = users[member];
      return <div key={member}>{name}</div>;
    })}
  </div>
);

const Group = ({ name, id, members, users }) => {
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

export default Group;
