const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  _id: {
    type: String
  },
  facebookId: {
    type: String
  },
  name: {
    type: String
  }
});

module.exports = mongoose.model('Users', User);