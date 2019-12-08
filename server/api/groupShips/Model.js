const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupShip = new Schema({
  _id: {
    type: String
  },
  requester: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('GroupShips', GroupShip);
