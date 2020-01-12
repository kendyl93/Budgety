import React from 'react';
import Member from './Member';

const TableHeader = () => (
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>e-mail</th>
    </tr>
  </thead>
);

const Members = ({
  invited = false,
  groupId,
  membersIds,
  users,
  currentUser
}) =>
  membersIds && (
    <div>
      <h3>{invited ? 'Invited' : 'Members'}:</h3>
      <table>
        <TableHeader />
        {membersIds.map((memberId, index) => {
          const displayIndex = index + 1;

          return (
            <Member
              currentUser={currentUser}
              groupId={groupId}
              id={memberId}
              index={displayIndex}
              invited={invited}
              key={memberId}
              member={users[memberId]}
            />
          );
        })}
      </table>
    </div>
  );

export default Members;
