import React from 'react';

import { Done as AcceptIcon } from '../UI/icons';
import { putRequest } from '../api';
import Link from '../UI/Link';

const ACTIONS = { ACCEPT: 'ACCEPT', REJECT: 'REJECT', INVITE: 'INVITE' };

const ActionButtons = ({ groupId, email }) => {
  const { ACCEPT } = ACTIONS;
  const data = { email, action: ACCEPT };

  return (
    <div className="action-buttons">
      <AcceptIcon
        className="accept-icon"
        onClick={() => putRequest(`groups/${groupId}`, data)}
      />
    </div>
  );
};

const Member = ({
  currentUser: { _id: currentUserId },
  invited,
  groupId,
  id: memberId,
  index,
  member: { name, email } = {}
}) => {
  const even = index % 2 === 0 ? 'even' : '';
  const path = `/groups/${groupId}/members/${memberId}/`;
  const maybeCurrentUser = currentUserId === memberId;

  return (
    <tr className={even}>
      <td>{index}</td>
      <td>
        <Link path={path}>{name}</Link>
      </td>
      <td>{email}</td>
      {maybeCurrentUser && invited && (
        <td>
          <ActionButtons email={email} groupId={groupId} />
        </td>
      )}
    </tr>
  );
};

export default Member;
