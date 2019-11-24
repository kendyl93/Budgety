const mongoose = require('mongoose');

const { Schema } = mongoose;

const Expence = new Schema({
  _id: {
    type: String
  },
  amount: {
    type: Number
  }
});

module.exports = mongoose.model('Expences', Expence);
