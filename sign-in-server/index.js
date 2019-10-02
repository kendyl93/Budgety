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

// const usersRoutes = express.Router();
// const Users = require('./Users');

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: SIGN_IN_FACEBOOK_CALLBACK
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ facebookId: profile.id }, (err, user) => {
      //   return cb(err, user);
      // });
    }
  )
);

app.get('/sign-in', passport.authenticate('facebook'));

app.get(
  `/sign-in/${FACEBOOK_CALLBACK}`,
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/failure'
  })
);

app.listen(SIGN_IN_PORT, () => {
  console.log('Sign in server is running on Port: ' + SIGN_IN_PORT);
});
