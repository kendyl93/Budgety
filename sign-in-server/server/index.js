import express from 'express';
import fs from 'fs';

const { CLIENT_PORT, NODE_ENV, HOST_URI } = process.env;

console.log('STATIC-SERVER:');
console.log({ CLIENT_PORT, NODE_ENV, HOST_URI });

const config = { CLIENT_PORT: 8000, NODE_ENV, HOST_URI };

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

app.listen(CLIENT_PORT, () => {
  console.log('Client static server is running on Port: ' + CLIENT_PORT);
});
