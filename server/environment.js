require('dotenv/config');

export const {
  COOKIE_SECRET,
  NODE_ENV,
  BACKEND_PORT,
  DB_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REVERSE_PROXY_PORT,
  HOST_URI
} = process.env;

export const FULL_CLIENT_HOST_URI =
  NODE_ENV === 'production'
    ? `http://${HOST_URI}`
    : `http://${HOST_URI}:${REVERSE_PROXY_PORT}`;

console.log('BACKEND SERVER:');
console.log({ NODE_ENV, BACKEND_PORT, DB_URI, HOST_URI });
