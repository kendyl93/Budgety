const mongoose = require('mongoose');

const { Schema } = mongoose;

const MemberShip = new Schema({
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

module.exports = mongoose.model('MemberShips', MemberShip);
