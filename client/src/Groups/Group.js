import React, { useState } from 'react';

import Avatar from '../UI/Avatar';
import Link from '../UI/Link';

const getIdFromUri = () => {
  const { href } = location;
  const splittedHref = href.split('/');
  const lastSplittedHrefElement = splittedHref.length - 1;
  const id = splittedHref[lastSplittedHrefElement];

  return id;
};

const handleChange = set => () => {
  const {
    target: { value = '' }
  } = event || {};

  set(value);
};

const Member = ({ groupId, id, index, member: { name } }) => {
  const even = index + (1 % 2) === 0 ? 'even' : '';
  const path = `/groups/${groupId}/members/${id}/`;

  return (
    <tr className={`${even}`}>
      <Link path={path}>
        <td>{index + 1}</td>
        <td>{name}</td>
      </Link>
    </tr>
  );
};

const Members = ({ groupId, membersIds, users }) => {
  return (
    membersIds && (
      <div>
        <h3>Members:</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          {membersIds.map((memberId, index) => (
            <Member
              groupId={groupId}
              id={memberId}
              index={index}
              key={memberId}
              member={users[memberId]}
            />
          ))}
        </table>
      </div>
    )
  );
};

const Group = ({ groups, users }) => {
  const id = getIdFromUri();
  const {
    name: sourceName,
    members: sourceMembersIds,
    description: sourceDescription = ''
  } = groups[id];

  const [name, setName] = useState(sourceName);
  const [description, setDescription] = useState(sourceDescription);

  const onChangeName = handleChange(setName);
  const onChangeDescription = handleChange(setDescription);

  const path = `/groups/${id}/new/`;

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
        <Members groupId={id} membersIds={sourceMembersIds} users={users} />
      </form>
      <div className="buttons-inline col-spacing">
        <Link path={path}>invite</Link>
        <button>save</button>
      </div>
    </div>
  );
};

export default Group;
