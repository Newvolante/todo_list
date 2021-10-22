const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  day: {
    type: Date,
    required: true,
  },
  task: {
    type: String,
    required: true
  }
});

module.export = mongoose.model('dayModel', daySchema);