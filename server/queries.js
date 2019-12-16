import _ from 'lodash';

import User from './api/users/Model';
import Group from './api/groups/Model';
import Expence from './api/expences/Model';

export const usersQuery = async () => {
  const users = await User.find({});

  if (!users) {
    throw new Error(
      'Something went wrong. Users are no available at the moment!'
    );
  }

  const usersView = _.keyBy(users, '_id');

  return usersView;
};

export const groupsQuery = async currentUser => {
  const groups = await Group.find({});

  const { groupsMember, groupsInvitedTo } = currentUser || {};
  const allcurrentUserGroups = [...groupsMember, ...groupsInvitedTo];

  const currentUserGroups = groups.filter(({ _id: id }) =>
    allcurrentUserGroups.includes(id)
  );

  if (!groups) {
    throw new Error(
      'Something went wrong. Groups are no available at the moment!'
    );
  }

  const groupsView = _.keyBy(currentUserGroups, '_id');

  return groupsView;
};

export const expencesQuery = async () => {
  const expences = await Expence.find({});

  if (!expences) {
    throw new Error(
      'Something went wrong. Expences are no available at the moment!'
    );
  }

  const expencesView = _.keyBy(expences, '_id');

  return expencesView;
};

export const currentUserQuery = async email => {
  const currentUser = await User.findOne({ email });

  if (!currentUser) {
    throw new Error('User is not signed in!');
  }

  return currentUser;
};
