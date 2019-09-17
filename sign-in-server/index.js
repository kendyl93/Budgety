import express from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';
import { google } from 'googleapis';

const app = express();
app.use(cors());
// app.use(bodyParser.json());

// db_connect();
app.get('/sign-in', (req, res) => {
  res.send('Sign in server - welcome');
});

app.listen(8050, () => {
  console.log('Sign in server is running on Port: ' + 8050);
});
