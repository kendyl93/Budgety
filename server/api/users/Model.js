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
  groupsMember: [{ type: String, ref: 'Groups' }],
  groupsInvitedTo: [{ type: String, ref: 'Groups' }],
  groupsRejected: [{ type: String, ref: 'Groups' }]
});

module.exports = mongoose.model('Users', User);
