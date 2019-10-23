require('dotenv/config');

const {
  COOKIE_SECRET,
  DB_URI,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_CALLBACK,
  HOST_URI,
  REVERSE_PROXY_PORT,
  SIGN_IN_PORT
} = process.env;

const SIGN_IN_FACEBOOK_CALLBACK = `http://${HOST_URI}:${REVERSE_PROXY_PORT}/sign-in/${FACEBOOK_CALLBACK}`;

export {
  COOKIE_SECRET,
  DB_URI,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_CALLBACK,
  SIGN_IN_PORT,
  SIGN_IN_FACEBOOK_CALLBACK
};

console.log('SIGN-IN SERVER:');
console.log({
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_CALLBACK,
  SIGN_IN_PORT,
  SIGN_IN_FACEBOOK_CALLBACK
});
