import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Expences from './expences/Expences';
import Create from './expences/Create';
import Edit from './expences/Edit';
import Dashboard from './Dashboard/Dashboard';
import Groups from './Groups/Groups';
import Group from './Groups/Group';
import Member from './Members/Member';
import Invite from './Members/Invite';

//passing props needs to be improved!
const Routes = props => {
  const {
    allData: { groups, users, currentUser }
  } = props;

  console.log({ location, props });
  return (
    <Switch>
      <Route component={() => <Dashboard {...props} />} exact path="/" />
      <Route component={() => <Groups {...props} />} exact path="/groups" />
      <Route
        component={() => (
          <Group currentUser={currentUser} groups={groups} users={users} />
        )}
        exact
        path="/groups/:groupId"
      />
      <Route
        component={() => <Invite {...props} />}
        exact
        path="/groups/:groupId/members/new"
      />
      <Route
        component={() => <Member {...props} />}
        exact
        path="/groups/:groupId/members/:userId"
      />
      <Route component={Expences} exact path="/expences" />
      <Route component={Edit} path="/expences/edit/:id" />
      <Route component={Create} path="/expences/create" />
    </Switch>
  );
};

export default Routes;
