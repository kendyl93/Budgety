import { v4 as uuid } from 'uuid';

const MemberShips = require('./Model');

export const show = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const memberShip = await MemberShips.findOne({ _id: id });

    return res.json(MemberShips);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const list = async (req, res) => {
  MemberShips.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
};

export const create = async (req, res) => {
  const { body } = req;
  console.log('#######111');
  console.log({ body });
  console.log('######111');
  const { user: { name = '', email = '' } = {} } = body;

  try {
    if (name) {
      const id = uuid();
      const user = new MemberShips({ _id: id, name, email });
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
