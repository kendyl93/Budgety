import React, { useState } from 'react';

import Avatar from '../UI/Avatar';
import Link from '../UI/Link';
import Members from './Members';

import { any } from '../array';

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

const Group = ({ groups, users, currentUser }) => {
  const id = getIdFromUri();
  const {
    name: sourceName,
    members: sourceMembersIds,
    invited: sourceInvitedIds,
    description: sourceDescription = ''
  } = groups[id];
  const { _id: currentUserId } = currentUser;

  const [name, setName] = useState(sourceName);
  const [description, setDescription] = useState(sourceDescription);

  const onChangeName = handleChange(setName);
  const onChangeDescription = handleChange(setDescription);

  const path = `/groups/${id}/members/new/`;

  const maybeAlreadyMember = sourceMembersIds.includes(currentUserId);
  const maybeInvitedUsers = any(sourceInvitedIds);

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
        <div>
          <button>save</button>
        </div>
        <Members
          currentUser={currentUser}
          groupId={id}
          membersIds={sourceMembersIds}
          users={users}
        />
        {maybeAlreadyMember && (
          <div className="pretend-button-wrapper buttons-inline col-spacing">
            <Link path={path}>invite</Link>
          </div>
        )}
        {maybeInvitedUsers && (
          <Members
            currentUser={currentUser}
            groupId={id}
            invited
            membersIds={sourceInvitedIds}
            users={users}
          />
        )}
      </form>
    </div>
  );
};

export default Group;
