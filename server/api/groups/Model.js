const mongoose = require('mongoose');

const { Schema } = mongoose;

const Group = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    required: true
  },
  members: []
});

module.exports = mongoose.model('Groups', Group);
