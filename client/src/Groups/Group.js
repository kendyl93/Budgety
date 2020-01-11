import React, { useState } from 'react';

import Avatar from '../UI/Avatar';
import Link from '../UI/Link';
import { Done as AcceptIcon } from '../UI/icons';
import { putRequest } from '../api';

const ACTIONS = { ACCEPT: 'ACCEPT', REJECT: 'REJECT', INVITE: 'INVITE' };

const ActionButtons = ({ groupId, memberId }) => (
  <div className="action-buttons">
    <AcceptIcon
      className="accept-icon"
      onClick={() =>
        putRequest(`groups/${groupId}`, { memberId, action: ACTIONS.ACCEPT })
      }
    />
  </div>
);

export const getIdFromUri = () => {
  const { href } = location;
  const splittedHref = href.split('/');
  const groupIdIndex = splittedHref.indexOf('groups') + 1;
  const id = splittedHref[groupIdIndex];

  return id;
};

const handleChange = set => () => {
  const {
    target: { value = '' }
  } = event || {};

  set(value);
};

const Member = ({
  currentUser: { _id: currentUserId },
  groupId,
  id: memberId,
  index,
  member: { name } = {}
}) => {
  const even = index % 2 === 0 ? 'even' : '';
  const path = `/groups/${groupId}/members/${memberId}/`;
  const maybeCurrentUser = currentUserId === memberId;
  console.log({ groupId });
  return (
    <tr className={even}>
      <td>{index}</td>
      <td>
        <Link path={path}>{name}</Link>
      </td>
      {maybeCurrentUser && (
        <td>
          <ActionButtons groupId={groupId} memberId={memberId} />
        </td>
      )}
    </tr>
  );
};

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
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        {membersIds.map((memberId, index) => {
          const displayIndex = index + 1;

          return (
            <Member
              currentUser={currentUser}
              groupId={groupId}
              id={memberId}
              index={displayIndex}
              key={memberId}
              member={users[memberId]}
            />
          );
        })}
      </table>
    </div>
  );

const Group = ({ groups, users, currentUser }) => {
  const id = getIdFromUri();
  const {
    name: sourceName,
    members: sourceMembersIds,
    invited: sourceInvitedIds,
    description: sourceDescription = ''
  } = groups[id];

  const [name, setName] = useState(sourceName);
  const [description, setDescription] = useState(sourceDescription);

  const onChangeName = handleChange(setName);
  const onChangeDescription = handleChange(setDescription);

  const path = `/groups/${id}/members/new/`;

  const maybeAlreadyMember = false;

  return (
    <div className="single-group row-spacing">
      <div className="avatar-wrapper">
        <Avatar name={name} />
        <h1>{name}</h1>
      </div>
      <form className="row-spacing">
        <div className="form-element">
          <span>Name:</span>
          <input onChange={onChangeName} value={name} />
        </div>
        <div className="form-element">
          <span>Description:</span>
          <textarea onChange={onChangeDescription} value={description} />
        </div>
        <Members
          currentUser={currentUser}
          groupId={id}
          membersIds={sourceMembersIds}
          users={users}
        />
        <Members
          currentUser={currentUser}
          groupId={id}
          invited
          membersIds={sourceInvitedIds}
          users={users}
        />
      </form>
      {maybeAlreadyMember && (
        <div className="buttons-inline col-spacing">
          <Link path={path}>invite</Link>
          <button>save</button>
        </div>
      )}
    </div>
  );
};

export default Group;
