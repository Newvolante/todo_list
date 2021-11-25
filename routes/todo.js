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

// GET request for todo/today
router.get('/today', async (req, res) => {
  // today's date
  let today = new Date();

  // year
  let year = today.getFullYear().toString();
  console.log(`Today's year is   ${year}   and it's of type ${typeof year}`);
  
  // month
  let month = today.getMonth() + 1; // starts from 0 (January)
  month.toString();
  console.log(`Today's month is   ${month}   and it's of type ${typeof month}`);
  
  // day
  let day = today.getDate().toString();
  console.log(`Today's month is   ${day}   and it's of type ${typeof day}`);  
  
  // date
  let date = year + "-" + month + "-" + day;
  console.log(`Today's date is   ${date}   and it's of type ${typeof date}`);  

  // querying the database
  let matchDay = await Day.find({
    day: date
  })

  matchDay.length != 0 ? console.log(`A matching day was found`) : console.log('A matching day was NOT found');

  res.render('today', {
    matchDay: matchDay
  });
});

// GET request for todo/tomorrow
router.get('/tomorrow', async (req, res) => {
  
  // today
  let today = new Date();
  
  // tomorrow
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);  // obtaining tomorrow's date
  
  // date to search
  let year = tomorrow.getFullYear();
  let month = tomorrow.getMonth() + 1;
  let number = tomorrow.getDate();
  let date = year + "-" + month + "-" + number;   // date in format yyyy-mm-dd
  
  // querying the database for tomorrow
  let matchingDay = await Day.find({
    day: date
  });
  
  matchingDay.length != 0 ? console.log(`A matching day was found`) : console.log('A matching day was NOT found');
  
  res.render('tomorrow', {
    day: matchingDay
  });
});

// GET request for todo/week
router.get('/week', async (req, res) => {

  // today's date
  let today = new Date();
  // year
  let year = today.getFullYear().toString();
  // month
  let month = today.getMonth() + 1; // starts from 0 (January)
  month.toString();
  // day
  let day = today.getDate().toString();
  // weekday
  let weekday = today.getDay();
  // date
  let date = year + "-" + month + "-" + day;

  // returning the day of the week
  let dayConverter = [];
  dayConverter[0] = "Domenica";
  dayConverter[1] = "Lunedi";
  dayConverter[2] = "Martedi";
  dayConverter[3] = "Mercoledi";
  dayConverter[4] = "Giovedi";
  dayConverter[5] = "Venerdi";
  dayConverter[6] = "Sabato";

  console.log(`Oggi, il primo giorno da inserire è ${dayConverter[weekday]}`);

  // days to add before and after
  let daysBefore = 0;
  let daysAfter = 0;

  // function to tell how many days to add before and after
  function addDays() {
    console.log('switching on ', weekday);
    switch(weekday) {
      case 0:
        daysBefore = 0;
        daysAfter = 6;
        return `Today is ${dayConverter[weekday]} and I will add ${daysBefore} days before and ${daysAfter} days after`;
        break;
      case 1:
        daysBefore = 1;
        daysAfter = 5;
        return `Today is ${dayConverter[weekday]} and I will add ${daysBefore} days before and ${daysAfter} days after`;
        break;
      case 2:
        daysBefore = 2;
        daysAfter = 4;
        return `Today is ${dayConverter[weekday]} and I will add ${daysBefore} days before and ${daysAfter} days after`;
        break;
      case 3:
        daysBefore = 3;
        daysAfter = 3;
        return `Today is ${dayConverter[weekday]} and I will add ${daysBefore} days before and ${daysAfter} days after`;
        break;
      case 4:
        daysBefore = 4;
        daysAfter = 2;
        return `Today is ${dayConverter[weekday]} and I will add ${daysBefore} days before and ${daysAfter} days after`;
        break;
      case 5:
        daysBefore = 5;
        daysAfter = 1;
        return `Today is ${dayConverter[weekday]} and I will add ${daysBefore} days before and ${daysAfter} days after`;
        break;
      case 6:
        daysBefore = 6;
        daysAfter = 0;
        return `Today is ${dayConverter[weekday]} and I will add ${daysBefore} days before and ${daysAfter} days after`;
        break;
    }
  }

  // how many days before and after?
  console.log(addDays(today));

  // finding the days to add before
  if (daysBefore) {
    // the array containing the days to search for and to add before
    let daysBeforeArr = [];
    daysBefore --;
    for (daysBefore; daysBefore >= 0; daysBefore --) {
      // each loop is 1 day lesser than today
      console.log('in for loop', daysBefore);
      // console.log(today.setDate(today.getDate() - 1));
      today.setDate(today.getDate() - 1).toLocaleString();
      daysBeforeArr[daysBefore] = today;
      console.log('added ', daysBeforeArr[daysBefore]);
    }
  }


  // querying the database
  let oggi = await Day.find({
    day: date
  })

  // playing with dates (adding days)
  // let test = new Date();
  // console.log("old", test);
  // test.setDate(test.getDate() + 10)
  // console.log("new", test);
  
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
    day: req.body.day,
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
