import React from 'react';
import Member from './Member';

const TableHeader = () => (
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">e-mail</th>
      <th scope="col">actions</th>
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
      <table className="table table-striped table-hover">
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
