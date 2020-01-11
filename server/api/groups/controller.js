import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

const Group = require('./Model');
const User = require('../users/Model');

import { ACCESS_TOKEN_COOKIE_NAME, COOKIE_SECRET } from '../../environment';

const ACTIONS = { ACCEPT: 'ACCEPT', REJECT: 'REJECT', INVITE: 'INVITE' };

const getCurrentUserId = async req => {
  const accessTokenCookie =
    req && req.cookies && req.cookies[ACCESS_TOKEN_COOKIE_NAME];
  const maybeSignedToken = jwt.verify(accessTokenCookie, COOKIE_SECRET);
  const { email } = maybeSignedToken || {};
  try {
    const { _id: currentUserId } = await User.findOne({ email });

    if (!currentUserId) {
      throw new Error('Current user not found!');
    }
    return currentUserId;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async user => await user.save();

export const show = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const groupShip = await Group.findOne({ _id: id });

    return res.json(groupShip);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const list = async (req, res) => {
  Group.find((err, groups) => {
    if (err) {
      console.log(err);
    } else {
      res.json(groups);
    }
  });
};

export const create = async (req, res) => {
  const { body } = req;
  const { user: { email = '' } = {}, name } = body;

  const currentUser = await User.findOne({ email });

  try {
    if (name) {
      const id = uuid();
      const group = new Group({
        _id: id,
        name,
        members: currentUser
      });

      const userGroups = currentUser.groupsMember;
      currentUser.groupsMember = [...userGroups, group];

      await updateUser(currentUser);
      await group.save();
    } else {
      throw new Error('Something went wrong while creating a group!');
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.sendStatus(200);
};

const filterElementOut = array => element =>
  array.filter(arrayElement => arrayElement !== element);

const preventDuplicates = array => [...new Set(array)];

const saveGroupOnInvitationAccepted = async (userToUpdate, groupToUpdate) => {
  const { members, invited } = groupToUpdate;
  const { _id: userToUpdateId } = userToUpdate;

  const uniqueUpdatedMembers = preventDuplicates([...members, userToUpdateId]);
  groupToUpdate.members = [...uniqueUpdatedMembers];

  const uniqueUpdatedInvited = preventDuplicates(
    filterElementOut(invited)(userToUpdateId)
  );
  groupToUpdate.invited = [...uniqueUpdatedInvited];

  await groupToUpdate.save();
};

const saveUserOnInvitationAccepted = async (userToUpdate, groupToUpdate) => {
  const { _id: groupToUpdateId } = groupToUpdate;
  const { groupsMember, groupsInvitedTo } = userToUpdate;

  const uniqueUpdatedGroupsMember = preventDuplicates([
    ...groupsMember,
    groupToUpdateId
  ]);
  // eslint-disable-next-line require-atomic-updates
  userToUpdate.groupsMember = [...uniqueUpdatedGroupsMember];

  const uniqueUpdatedGroupsInvitedTo = preventDuplicates(
    filterElementOut(groupsInvitedTo)(groupToUpdateId)
  );
  // eslint-disable-next-line require-atomic-updates
  userToUpdate.groupsInvitedTo = [...uniqueUpdatedGroupsInvitedTo];

  await userToUpdate.save();
};

const acceptInvitaion = async (userToUpdate, groupToUpdate) => {
  try {
    await Promise.all([
      saveGroupOnInvitationAccepted(userToUpdate, groupToUpdate),
      saveUserOnInvitationAccepted(userToUpdate, groupToUpdate)
    ]);

    return;
  } catch (error) {
    console.error({ error });
  }
};

const invite = async (groupToUpdate, userToUpdate) => {
  try {
    const { invited, _id: groupToUpdateId } = groupToUpdate;
    const { groupsInvitedTo } = userToUpdate;

    const uniqueInvited = preventDuplicates([...invited, userToUpdate]);
    groupToUpdate.invited = [...uniqueInvited];
    await groupToUpdate.save();

    const uniqueGroupsInvitedTo = preventDuplicates([
      ...groupsInvitedTo,
      groupToUpdateId
    ]);
    // eslint-disable-next-line require-atomic-updates
    userToUpdate.groupsInvitedTo = [...uniqueGroupsInvitedTo];

    return await userToUpdate.save();
  } catch (error) {
    console.error({ error });
  }
};

export const update = async (req, res) => {
  const {
    body,
    params: { id: groupId }
  } = req;
  const { email = '', action } = body;
  const { ACCEPT, INVITE, REJECT } = ACTIONS;
  //TODO: detect what changes user is trying to do and make them properly
  try {
    const userToUpdate = await User.findOne({ email });
    const groupToUpdate = await Group.findOne({ _id: groupId });

    switch (action) {
      case ACCEPT:
        await acceptInvitaion(userToUpdate, groupToUpdate);
        console.log('Invitation accepted');
        break;
      case INVITE:
        await invite();
        console.log('Invitation sent');
        break;
      case REJECT:
        console.log({ C: 'Currently reject the member is not possible' });
        break;
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.sendStatus(200);
};
