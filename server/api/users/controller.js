import { v4 as uuid } from 'uuid';

const User = require('./Model');

export const show = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const user = await User.findOne({ _id: id });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const list = async (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
};

export const create = async (req, res) => {
  const { body } = req;

  const { user: { name = '', email = '' } = {} } = body;

  try {
    if (name) {
      const id = uuid();
      const user = new User({ _id: id, name, email });
      await user.save();
    } else {
      throw new Error('User must have at least a name!');
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.sendStatus(200);
};
