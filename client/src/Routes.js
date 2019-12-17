import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Expences from './expences/Expences';
import Create from './expences/Create';
import Edit from './expences/Edit';
import Dashboard from './Dashboard/Dashboard';
import Groups from './Groups/Groups';
import Group from './Groups/Group';

//passing props needs to be improved!
const Routes = props => (
  <Switch>
    <Route component={() => <Dashboard {...props} />} exact path="/" />
    <Route component={() => <Groups {...props} />} exact path="/groups" />
    <Route component={() => <Group {...props} />} exact path="/groups/:id" />
    <Route component={Expences} exact path="/expences" />
    <Route component={Edit} path="/expences/edit/:id" />
    <Route component={Create} path="/expences/create" />
  </Switch>
);

export default Routes;
