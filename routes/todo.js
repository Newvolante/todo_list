// This manages the /todo route

//express settings
const express = require('express');
const router = express.Router();
const Day = require('./../model/day_model');

// GET request for the root route
router.get('/', async (req, res) => {
  
  // the days in the database
  let days = await Day.find();

  // passing all the days to the index view
  res.render('index', {
    days: days
  });
});

// GET request for /todo/new_day
router.get('/new_day', (req, res) => {
  res.render('new_day.ejs');
});

// POST request
router.post('/', (req, res) => {
  let day = new Day({
    day: req.body.day,
    task: req.body.task
  });
  console.log(day);

  day.save();
  res.redirect('/todo');
});

module.exports = router;
