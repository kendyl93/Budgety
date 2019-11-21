import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Expences from './expences/Expences';
import Create from './expences/Create';
import Edit from './expences/Edit';

const Routes = () => (
  <Switch>
    <Route component={Expences} exact path="/expences" />
    <Route component={Edit} path="/expences/edit/:id" />
    <Route component={Create} path="/expences/create" />
  </Switch>
);

export default Routes;
