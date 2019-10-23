import express from 'express';
import cors from 'cors';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import {
  COOKIE_SECRET,
  FACEBOOK_CALLBACK,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  SIGN_IN_PORT,
  SIGN_IN_FACEBOOK_CALLBACK
} from './environment';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
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
app.use(bodyParser.json());
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
    const {
      user: { facebookId, name }
    } = req || {};

    console.log({ facebookId });

    const now = new Date().valueOf();
    const weekInMiliseconds = 7 * 24 * 60 * 60 * 1000;
    const expires = new Date(now + weekInMiliseconds);

    const payload = {
      facebookId,
      name,
      expires
    };

    const token = jwt.sign(JSON.stringify(payload), COOKIE_SECRET);
    console.log('@@@@@@@@@@@@');
    console.log({ token });
    res.cookie('access_token', token);

    res.redirect(`http://localhost:5470/api/users/facebook/${token}`);
  }
);

app.listen(SIGN_IN_PORT, () => {
  console.log('Sign in server is running on Port: ' + SIGN_IN_PORT);
});
