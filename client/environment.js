require('dotenv/config');

export const {
  CLIENT_PORT,
  NODE_ENV,
  HOST_URI,
  REVERSE_PROXY_PORT
} = process.env;

console.log('CLIENT SERVER:');
console.log({ CLIENT_PORT, NODE_ENV, HOST_URI, REVERSE_PROXY_PORT });
