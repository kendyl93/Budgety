import { v4 as uuid } from 'uuid';

const Group = require('./Model');

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

  try {
    if (name) {
      const id = uuid();
      const group = new Group({ _id: id, name, owner_id: email });
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
