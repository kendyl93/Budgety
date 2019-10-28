import express from 'express';
import fs from 'fs';

const { SIGN_IN_STATIC_PORT, NODE_ENV, HOST_URI } = process.env;

console.log('STATIC-SERVER:');
console.log({ SIGN_IN_STATIC_PORT, NODE_ENV, HOST_URI });

const config = { SIGN_IN_STATIC_PORT, NODE_ENV, HOST_URI };

const app = express();
app.use(express.static('./dist'));

const ejs = fs.readFileSync('./dist/index.ejs', 'utf8');

const INJECT_TAG = '<!-- ENVIRONMENT -->';

const environmentScript = config =>
  `<script>window.process = { env: ${JSON.stringify(config)} };</script>`;

const template = config => ejs.replace(INJECT_TAG, environmentScript(config));

app.get('*', (_, res) => {
  const body = template(config);
  res.send(200, body);
});

app.listen(SIGN_IN_STATIC_PORT, () => {
  console.log(
    'Sign in static server is running on Port: ' + SIGN_IN_STATIC_PORT
  );
});
