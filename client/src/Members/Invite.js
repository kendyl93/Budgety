import React, { useState } from 'react';

import { putRequest } from '../api';
import { getIdFromUri } from '../Groups/Group';

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

const Invite = ({ allData: { currentUser } }) => {
  const [email, setEmail] = useState('');

  const onEmailChange = () => {
    const {
      target: { value }
    } = event;
    setEmail(value);
  };

  return (
    <div>
      <h1>Invite member to the group</h1>
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
