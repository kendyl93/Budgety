import express from 'express';
import cors from 'cors';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import {
  FACEBOOK_CALLBACK,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  SIGN_IN_PORT,
  SIGN_IN_FACEBOOK_CALLBACK
} from './environment';
import fetch from 'node-fetch';

console.log('SIGN IN server');
console.log({
  FACEBOOK_CALLBACK,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  SIGN_IN_PORT,
  SIGN_IN_FACEBOOK_CALLBACK
});

const app = express();
app.use(cors());

const userRoutes = express.Router();

app.use('/api/users', userRoutes);
app.use(passport.initialize());

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: SIGN_IN_FACEBOOK_CALLBACK
    },
    (accessToken, refreshToken, profile, done) => {
      const body = {
        facebookId: profile.id, //need to investigate what Id should I assigned to the user. I would like to add more strategies. Maybe use NODE-UUID.
        name: profile.displayName,
        provider: profile.provider,
        accessToken
      };
      return done(null, body);
    }
  )
);

app.get('/sign-in', passport.authenticate('facebook'));

app.get(
  `/sign-in/${FACEBOOK_CALLBACK}`,
  passport.authenticate('facebook', {
    failureRedirect: '/sign-in',
    session: false
  }),
  async (req, res, next) => {
    const { user } = req || {};

    try {
      await fetch('http://localhost:5470/api/users/facebook', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ user })
      });

      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('ERROR');
    }
  }
);

app.listen(SIGN_IN_PORT, () => {
  console.log('Sign in server is running on Port: ' + SIGN_IN_PORT);
});
