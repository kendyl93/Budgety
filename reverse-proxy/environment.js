const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { NODE_ENV } = process.env;
const devEnv = {
  HOST_URI_ALONE: 'localhost'
};

export const { HOST_URI_ALONE } =
  NODE_ENV === 'production' ? process.env : devEnv;
