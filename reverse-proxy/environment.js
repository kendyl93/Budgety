require('dotenv/config');

export const { NODE_ENV, HOST_URI, REVERSE_PROXY_PORT } = process.env;

console.log('REVERSE-PROXY SERVER:');
console.log({ NODE_ENV, HOST_URI, REVERSE_PROXY_PORT });
