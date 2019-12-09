const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  _id: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  groups_member: [{ type: String, ref: 'Groups' }],
  groups_invited_to: [{ type: String, ref: 'Groups' }],
  groups_rejected: [{ type: String, ref: 'Groups' }]
});

module.exports = mongoose.model('Users', User);
