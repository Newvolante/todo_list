// express settings
const express = require('express');
const PORT = 6500;
const app = express();

// mongoose settings
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo');

// setting the view engine
app.set('view engine', 'ejs');

// root route
app.get('/', (req, res) => {
  res.render('index');
});

// server listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
