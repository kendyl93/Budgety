import React, { useState } from 'react';

import Avatar from '../UI/Avatar';
import Link from '../UI/Link';

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

const Member = ({ groupId, id, index, member: { name } = {} }) => {
  const even = index % 2 === 0 ? 'even' : '';
  const path = `/groups/${groupId}/members/${id}/`;

  return (
    <tr className={`${even}`}>
      <Link path={path}>
        <td>{index}</td>
        <td>{name}</td>
      </Link>
    </tr>
  );
};

const Members = ({ invited = false, groupId, membersIds, users }) =>
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
          const indexToDisplay = index + 1;

          return (
            <Member
              groupId={groupId}
              id={memberId}
              index={indexToDisplay}
              key={memberId}
              member={users[memberId]}
            />
          );
        })}
      </table>
    </div>
  );

const Group = ({ groups, users }) => {
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

  return (
    <div className="single-group row-spacing">
      <div className="avatar-wrapper">
        <Avatar name={name} />
        <h1>{name}</h1>
      </div>
      <form className="row-spacing">
        <div className="form-element">
          <div className="field">
            <label>Name:</label>
            <input onChange={onChangeName} value={name} />
          </div>
        </div>
        <div className="form-element">
          <span>Description:</span>
          <textarea onChange={onChangeDescription} value={description} />
        </div>
        <Members groupId={id} membersIds={sourceMembersIds} users={users} />
        <Members
          groupId={id}
          invited
          membersIds={sourceInvitedIds}
          users={users}
        />
      </form>
      <div className="buttons-inline col-spacing">
        <Link path={path}>invite</Link>
        <button>save</button>
      </div>
    </div>
  );
};

export default Group;
