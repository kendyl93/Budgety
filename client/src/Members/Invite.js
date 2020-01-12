import React, { useState } from 'react';

import { putRequest } from '../api';
import { getIdFromUri } from '../Groups/Group';
import { ACTIONS } from '../Groups/actions';

const update = data => {
  const groupId = getIdFromUri();
  const path = `groups/${groupId}`;

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

const InlineButton = ({ children, onClick, ...rest }) => {
  const { path } = rest;
  const onButtonClick = () => onClick(path);

  return (
    <span className="inline-button" onClick={onButtonClick}>
      {children}
    </span>
  );
};

const Invite = ({ allData: { currentUser, groups } }) => {
  const [email, setEmail] = useState('');
  const { INVITE } = ACTIONS;

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
        Invite member to{' '}
        <InlineButton onClick={replaceLocationWithPath} path={path}>
          {groupName}
        </InlineButton>
      </h1>
      <form
        className="row-spacing"
        onSubmit={() => {
          currentUser && onInvite({ user: currentUser, email, action: INVITE });
        }}
      >
        <div className="field">
          <label>Email</label>
          <input
            onChange={onEmailChange}
            placeholder="john.doe@domain.com"
            type="email"
          />
        </div>
        <input type="submit" value="invite" />
      </form>
    </div>
  );
};

export default Invite;
