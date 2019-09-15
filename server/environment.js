const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { NODE_ENV } = process.env;
const devEnv = {
  PORT: 4000,
  DB_URI: 'mongodb://localhost:27017/todos-mern'
};

export const { PORT, DB_URI } =
  NODE_ENV === 'production' ? process.env : devEnv;
