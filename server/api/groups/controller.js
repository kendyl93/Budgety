import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

const Group = require('./Model');
const User = require('../users/Model');

import { ACCESS_TOKEN_COOKIE_NAME, COOKIE_SECRET } from '../../environment';
import { acceptInvitaion, invite } from './helpers';

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

export const update = async (req, res) => {
  const {
    body,
    params: { id: groupId }
  } = req;
  const { email = '', action } = body;
  const { ACCEPT, INVITE, REJECT } = ACTIONS;

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
        console.log('Currently reject the member is not possible');
        break;
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.sendStatus(200);
};
