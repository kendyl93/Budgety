import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Todos from './todos/Todos';
import Create from './todos/Create';
import Edit from './todos/Edit';

import Login from './Login';

const Routes = () => (
  <Switch>
    <Route component={Todos} exact path="/" />
    <Route component={Login} path="/login" />
    <Route component={Edit} path="/edit/:id" />
    <Route component={Create} path="/create" />
  </Switch>
);

export default Routes;
