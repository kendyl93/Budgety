import express from 'express';
import fs from 'fs';

const config = {};

const app = express();
app.use(express.static('./dist'));

const ejs = fs.readFileSync('./public/index.ejs', 'utf8');

const INJECT_TAG = '<!-- ENVIRONMENT -->';

const environmentScript = config =>
  `<script>window.process = { env: ${JSON.stringify(config)} };</script>`;

const template = config => ejs.replace(INJECT_TAG, environmentScript(config));

app.get('*', (_, res) => {
  const body = template(config);
  res.send(200, body);
});

app.listen(3000, () => {
  console.log('Sign in server is running on Port: ' + 3000);
});
