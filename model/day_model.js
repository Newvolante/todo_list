const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  day: {
    type: Date,
    required: true
  },
  task1: {
    type: String,
    required: true
  },
  task2: {
    type: String,
  },
  task3: {
    type: String,
  },
  task4: {
    type: String,
  },
  task5: {
    type: String,
  },
  task6: {
    type: String,
  },
  task7: {
    type: String,
  },
  task8: {
    type: String,
  },
  task9: {
    type: String,
  },
  task10: {
    type: String,
  }
});

module.exports = mongoose.model('Day', daySchema);