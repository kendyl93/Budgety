const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { NODE_ENV } = process.env;
const devEnv = {
  PORT: 5470,
  HOST_URI: 'localhost'
};

export const { PORT, HOST_URI } =
  NODE_ENV === 'production' ? process.env : devEnv;
