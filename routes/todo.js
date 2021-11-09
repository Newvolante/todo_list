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
  res.render('new_day.ejs', {
    day: new Day()
  });
});

// GET request for the edit route
router.get('/edit/:id', async (req, res) => {
  let day = await Day.findById(req.params.id);
  
  res.render('edit', {
    day: day
  });
});

// POST request
router.post('/', (req, res) => {
  let day = new Day({
    day: req.body.day.toISOString().slice(0, 16).replace('T', ' '),
    task1: req.body.task1,
    task2: req.body.task2,
    task3: req.body.task3,
    task4: req.body.task4,
    task5: req.body.task5,
    task6: req.body.task6,
    task7: req.body.task7,
    task8: req.body.task8,
    task9: req.body.task9,
    task10: req.body.task10,
  });
  console.log(day.day);

  day.save();
  res.redirect('/todo');
});

// edit route
router.put('/edit/:id', async (req, res) => {
  let day = await Day.findById(req.params.id);

  day.day = req.body.day;
  day.task1 = req.body.task1;
  day.task2 = req.body.task2;
  day.task3 = req.body.task3;
  day.task4 = req.body.task4;
  day.task5 = req.body.task5;
  day.task6 = req.body.task6;
  day.task7 = req.body.task7;
  day.task8 = req.body.task8;
  day.task9 = req.body.task9;
  day.task10 = req.body.task10;
  
  await day.save();

  res.redirect('/todo');
});

// delete route
router.delete('/:id', async (req, res) => {
  try {
    let day = req.params.id;
    await Day.findByIdAndDelete(day);
    res.redirect('/todo');
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;
