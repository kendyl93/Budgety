require('dotenv/config');

export const { COOKIE_SECRET, NODE_ENV, BACKEND_PORT, DB_URI } = process.env;

console.log('BACKEND SERVER:');
console.log({ NODE_ENV, BACKEND_PORT, DB_URI });
