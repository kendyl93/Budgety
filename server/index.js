import { db_connect } from './db';
import { BACKEND_PORT } from './environment';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const todoRoutes = express.Router();
const Todo = require('./Todo');

const userRoutes = express.Router();
const User = require('./Users');

const app = express();
app.use(cors());
app.use(bodyParser.json());
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

userRoutes.route('/facebook').post(async (req, res) => {
  const {
    user: { _id: id }
  } = req.body;

  try {
    const userExist = await User.find({ _id: id });

    if (!userExist) {
      const user = new User(req.body);

      console.log({ user });
      await user.save();

      res.redirect('/');
    }

    console.log('User already exist');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
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
