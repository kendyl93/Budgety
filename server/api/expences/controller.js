import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_COOKIE_NAME, COOKIE_SECRET } from '../../environment';

const Expence = require('./Model');
const User = require('../users/Model');

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

export const show = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const expence = await Expence.findOne({ _id: id });

    return res.json(expence);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const list = async (req, res) => {
  try {
    const currentUserId = await getCurrentUserId(req);
    const expences = await Expence.find({ user_id: currentUserId });

    return res.status(200).json(expences);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const update = (req, res) => {
  const {
    params: { id }
  } = req;

  Expence.findById(id, expence => {
    if (!expence) {
      res.status(404).send('Expence is not found');
    }

    const {
      body: { amount }
    } = req;

    expence.amount = amount;

    expence
      .save()
      .then(() => {
        res.json('Expence updated!');
      })
      .catch(() => {
        res.status(400).send('Update not possible');
      });
  });
};

export const remove = async (req, res) => {
  const {
    params: { id }
  } = req;

  Expence.findById(id, (_, expence) => {
    expence
      .remove()
      .then(() => {
        res.json('Expence deleted!');
      })
      .catch(() => {
        res.status(400).send('Update not possible');
      });
  });
};

export const create = async (req, res) => {
  const { body: { amount, userId } = {} } = req;
  const id = uuid();

  const expence = new Expence({ amount, _id: id, user_id: userId });

  expence
    .save()
    .then(() => {
      res.status(200).json({ expence: 'Expence added successfully' });
    })
    .catch(() => {
      res.status(400).send('adding new expence failed');
    });
};
