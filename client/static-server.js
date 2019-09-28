import express from 'express';
import { CLIENT_PORT } from './environment';
import fs from 'fs';

const app = express();
app.use(express.static('./dist'));

app.get('*', (_, res) => {
  res.sendFile('index.js');
});

app.listen(CLIENT_PORT, () => {
  console.log('Client static server is running on Port: ' + CLIENT_PORT);
});
