import { db_connect } from './db';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  FULL_CLIENT_HOST_URI,
  BACKEND_PORT,
  COOKIE_SECRET,
  HOST_URI,
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
import {
  usersQuery,
  expencesQuery,
  groupsQuery,
  currentUserQuery
} from './queries';
import User from './api/users/Model';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const checkTokenAuthorization = (req, res, next) => {
  const tokenWithBearer =
    req.headers['x-access-token'] || req.headers['authorization'];

  if (!tokenWithBearer) {
    console.error('No token found!');
    return res.sendStatus(500);
  }

  if (!tokenWithBearer.startsWith('Bearer ')) {
    console.error('Invalid token!');
    return res.sendStatus(500);
  }

  const token = tokenWithBearer.slice(7, tokenWithBearer.length);

  if (!token) {
    console.error("Invalid token's signature!");
    return res.sendStatus(500);
  }

  jwt.verify(token, COOKIE_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

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

      const signedToken = jwt.sign(
        JSON.stringify({ email, name }),
        COOKIE_SECRET
      );

      res.cookie(ACCESS_TOKEN_COOKIE_NAME, signedToken);
      return res.redirect(FULL_CLIENT_HOST_URI);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
);

app.get('/api/logout', (req, res) => {
  try {
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
  } catch (error) {
    return console.error(error);
  }

  res.redirect('/');
  return res.end();
});

app.all('*', checkTokenAuthorization);

db_connect();

app.use('/api', apiRouter);

const query = async token => {
  const { email } = token;

  const currentUser = await currentUserQuery(email);

  const usersView = await usersQuery();
  const groupsView = await groupsQuery(currentUser);
  const expencesView = await expencesQuery();

  return { currentUser, usersView, groupsView, expencesView };
};

app.use('/', async (req, res) => {
  const accessTokenCookie =
    req && req.cookies && req.cookies[ACCESS_TOKEN_COOKIE_NAME];

  if (!accessTokenCookie) {
    return res.redirect('/login');
  }
  const maybeSignedToken = jwt.verify(accessTokenCookie, COOKIE_SECRET);

  if (!maybeSignedToken) {
    return res.redirect('/login');
  }

  try {
    const { currentUser, usersView, groupsView, expencesView } = await query(
      maybeSignedToken
    );

    res.status(200).send({
      currentUser,
      users: usersView,
      groups: groupsView,
      expences: expencesView
    });
    return res.end();
  } catch (error) {
    console.error(error);
    return res.redirect('/login');
  }
});

app.listen(BACKEND_PORT, () => {
  console.log('Backend server is running on Port: ' + BACKEND_PORT);
});
