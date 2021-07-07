import React from 'react';
import Member from './Member';

const TableHeader = ({ invited }) => (
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">e-mail</th>
      <th scope="col">{invited ? 'actions' : 'badges'}</th>
    </tr>
  </thead>
);

const Members = ({
  ownerId,
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
        <TableHeader invited={invited} />
        {membersIds.map((memberId, index) => {
          const displayIndex = index + 1;
          const maybeOwner = ownerId === memberId;

          return (
            <Member
              currentUser={currentUser}
              groupId={groupId}
              id={memberId}
              index={displayIndex}
              invited={invited}
              key={memberId}
              member={users[memberId]}
              owner={maybeOwner}
            />
          );
        })}
      </table>
    </div>
  );

export default Members;
