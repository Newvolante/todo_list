const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  day: {
    type: Date,
    required: true
  },
  task: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Day', daySchema);