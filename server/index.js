import { db_connect } from './db';
import { BACKEND_PORT, COOKIE_SECRET } from './environment';
import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

const todoRoutes = express.Router();
const Todo = require('./Todo');

const userRoutes = express.Router();
const User = require('./Users');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

db_connect();

userRoutes.route('/').get((req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

userRoutes.route('/current').get(async (req, res) => {
  const accessTokenCookie = req.cookies && req.cookies.access_token;
  const { facebookId } = jwt.verify(accessTokenCookie, COOKIE_SECRET);

  try {
    const user = await User.findOne({ facebookId });
    if (user) {
      res.json(user);
    } else {
      throw new Error('User is not logged in!');
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

userRoutes.route('/add').post(async (req, res, next) => {
  const { body } = req;

  const { user: { name = '', facebookId = '' } = {} } = body;

  console.log({ name });

  try {
    if (name) {
      const id = uuid();
      const user = new User({ _id: id, name, facebookId });
      await user.save();
    } else {
      throw new Error('User must have at least a name!');
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.sendStatus(200);
});

///////////////////////////////

todoRoutes.route('/').get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route('/:id').get((req, res) => {
  const {
    params: { id }
  } = req;

  Todo.findById(id, (_, todo) => {
    res.json(todo);
  });
});

todoRoutes.route('/:id').put((req, res) => {
  const {
    params: { id }
  } = req;

  Todo.findById(id, (err, todo) => {
    if (!todo) {
      res.status(404).send('data is not found');
    } else {
      const {
        body: { description, responsible, priority, completed }
      } = req;

      todo.description = description;
      todo.responsible = responsible;
      todo.priority = priority;
      todo.completed = completed;
    }

    todo
      .save()
      .then(() => {
        res.json('Budget updated!');
      })
      .catch(() => {
        res.status(400).send('Update not possible');
      });
  });
});

todoRoutes.route('/:id').delete((req, res) => {
  const {
    params: { id }
  } = req;

  Todo.findById(id, (_, todo) => {
    todo
      .remove()
      .then(() => {
        res.json('Budget deleted!');
      })
      .catch(() => {
        res.status(400).send('Update not possible');
      });
  });
});

todoRoutes.route('/add').post((req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then(() => {
      res.status(200).json({ todo: 'Budget added successfully' });
    })
    .catch(() => {
      res.status(400).send('adding new todo failed');
    });
});

app.listen(BACKEND_PORT, () => {
  console.log('Backend server is running on Port: ' + BACKEND_PORT);
});
