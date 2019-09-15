const mongoose = require('mongoose');
import { DB_URI } from './environment';

export const db_connect = () => {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true
  });

  const { connection } = mongoose;

  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
};
