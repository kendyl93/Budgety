import { v4 as uuid } from 'uuid';

const Expence = require('./Model');

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
  Expence.find((err, expences) => {
    if (err) {
      console.log(err);
    } else {
      res.json(expences);
    }
  });
};

export const update = async (req, res) => {
  const {
    params: { id }
  } = req;

  Expence.findById(id, (err, expence) => {
    if (!expence) {
      res.status(404).send('data is not found');
    } else {
      const {
        body: { amount }
      } = req;

      expence.amount = amount;
    }

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

  console.log('&&&&&&');
  console.log({ amount, userId });
  console.log('&&&&&&');

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
