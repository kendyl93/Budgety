import express from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';
import { SIGN_IN_PORT } from './environment';

const app = express();
app.use(cors());
// app.use(bodyParser.json());

// db_connect();
app.get('/sign-in', (req, res) => {
  res.send('Sign in server - welcome');
});

app.listen(SIGN_IN_PORT, () => {
  console.log('Sign in server is running on Port: ' + SIGN_IN_PORT);
});
