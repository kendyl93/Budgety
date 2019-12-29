import React, { useState } from 'react';

import { putRequest } from '../api';
import { getIdFromUri } from '../Groups/Group';
import Link from '../UI/Link';

const update = data => {
  const groupId = getIdFromUri();
  const path = `groups/${groupId}`;
  console.log({ data, groupId });
  return putRequest(path, { ...data, groupId });
};

const onInvite = async data => {
  try {
    await update(data);
  } catch (error) {
    console.error(error);
  }
};

const replaceLocationWithPath = path => {
  window.location = `#${path}`;
};

const Invite = ({ allData: { currentUser, groups } }) => {
  const [email, setEmail] = useState('');

  const onEmailChange = () => {
    const {
      target: { value }
    } = event;
    setEmail(value);
  };
  const groupId = getIdFromUri();
  const { name: groupName } = groups[groupId] || {};
  const path = `groups/${groupId}`;

  return (
    <div>
      <h1>
        Invite member to
        {<div onClick={() => replaceLocationWithPath(path)}>{groupName}</div>}
      </h1>
      <form
        onSubmit={() => {
          currentUser && onInvite({ user: currentUser, email });
        }}
      >
        <input onChange={onEmailChange} type="email" />
        <input type="submit" value="invite" />
      </form>
    </div>
  );
};

export default Invite;
