// express settings
const express = require('express');
const PORT = 6500;
const app = express();
const todoRouter = require('./routes/todo');

// mongoose settings
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo');

// setting the view engine
app.set('view engine', 'ejs');

// root route management
app.use('/todo', todoRouter);

// server listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
