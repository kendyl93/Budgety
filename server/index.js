import { db_connect } from './db';
import {
  FULL_CLIENT_HOST_URI,
  BACKEND_PORT,
  COOKIE_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} from './environment';
import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import apiRouter from './api/router';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const checkTokenAuthorization = (req, res, next) => {
  const tokenWithBearer =
    req.headers['x-access-token'] || req.headers['authorization'];

  if (!tokenWithBearer) {
    console.error('No token found!');
    return res.redirect('/login');
  }

  if (!tokenWithBearer.startsWith('Bearer ')) {
    console.error('Invalid token!');
    return res.redirect('/login');
  }

  const token = tokenWithBearer.slice(7, tokenWithBearer.length);

  if (!token) {
    console.error("Invalid token's signature!");
    return res.redirect('/login');
  }

  jwt.verify(token, COOKIE_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.redirect('/login');
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

const userRoutes = express.Router();
const User = require('./Users');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${FULL_CLIENT_HOST_URI}/api/auth/google/callback`
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
    failureRedirect: '/login',
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
            res.status(200).json({ USER: 'User added successfully' });
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
      return res.redirect(FULL_CLIENT_HOST_URI);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
);

app.all('*', checkTokenAuthorization);

app.use('/api', apiRouter);
app.use('/api/users', userRoutes);

db_connect();

userRoutes.route('/').get((req, res, next) => {
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
});

///////////////////////////////

app.use('/', (req, res) => {
  const accessTokenCookie = res && req.cookies && req.cookies['access_token'];

  if (!accessTokenCookie) {
    res.redirect('/login');
  }
  const TOKEN_signedornot = jwt.verify(accessTokenCookie, COOKIE_SECRET);

  if (!TOKEN_signedornot) {
    res.redirect('/login');
  }

  res.status(200).send({ name: TOKEN_signedornot.name });
  return res.end();
});

app.listen(BACKEND_PORT, () => {
  console.log('Backend server is running on Port: ' + BACKEND_PORT);
});
