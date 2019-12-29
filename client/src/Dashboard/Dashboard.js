import React from 'react';
import _ from 'lodash';

import { GroupList } from '../Groups/Groups';

const Dashboard = ({ allData: { currentUser, groups, users } }) => {
  const { groupsInvitedTo } = currentUser;
  const currentUserInvitedToGroups = groupsInvitedTo.map(
    groupId => groups[groupId]
  );
  const currentUserInvitedToGroupsView = _.keyBy(
    currentUserInvitedToGroups,
    '_id'
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <GroupList
        currentUser={currentUser}
        groups={currentUserInvitedToGroupsView}
        invited
        users={users}
      />
    </div>
  );
};

export default Dashboard;
