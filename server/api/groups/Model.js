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
  owner: { type: String, ref: 'Users' },
  rejected: [{ type: String, ref: 'Users' }],
  invited: [{ type: String, ref: 'Users' }],
  members: [{ type: String, ref: 'Users' }]
});

module.exports = mongoose.model('Groups', Group);
