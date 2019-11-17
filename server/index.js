import { db_connect } from './db';
import {
  NODE_ENV,
  BACKEND_PORT,
  COOKIE_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REVERSE_PROXY_PORT,
  HOST_URI
} from './environment';
import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const todoRoutes = express.Router();
const Todo = require('./Todo');

const userRoutes = express.Router();
const User = require('./Users');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
console.log({ NODE_ENV, HOST_URI });
console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');

const FULL_HOST_URI =
  NODE_ENV === 'production'
    ? `http://${HOST_URI}`
    : `http://${HOST_URI}:${REVERSE_PROXY_PORT}`;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${FULL_HOST_URI}/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      const userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken
      };
      console.log({ userData });
      done(null, userData);
    }
  )
);

app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login_od_google',
    session: false
  }),

  async (req, res, next) => {
    const { email, name } = req.user;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        const user = new User({ _id: uuid(), name, email });

        user
          .save()
          .then(() => {
            res.status(200).json({ todo: 'User added successfully' });
          })
          .catch(() => {
            res.status(400).send('adding new user failed');
          });
      }
      console.log({ user });
      const signedToken = jwt.sign(
        JSON.stringify({ email, name }),
        COOKIE_SECRET
      );
      res.cookie('access_token', signedToken);
      return res.redirect(FULL_HOST_URI);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
);

app.use('/', async (req, res) => {
  const accessTokenCookie = req.cookies && req.cookies['access_token'];
  console.log({ FIRST: accessTokenCookie, OR: req.cookies });
  if (!accessTokenCookie) {
    return res.sendStatus(500);
  }
  const TOKEN_signedornot = jwt.verify(accessTokenCookie, COOKIE_SECRET);

  if (!TOKEN_signedornot) {
    return res.sendStatus(500);
  }

  return res.status(200).send({ name: TOKEN_signedornot.name });
});

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
