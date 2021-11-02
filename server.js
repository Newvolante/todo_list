// express settings
const express = require('express');
const PORT = 6500;
const app = express();
const todoRouter = require('./routes/todo');

// method override
const methodOverride = require('method-override');

// mongoose settings
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');


// setting the view engine
app.set('view engine', 'ejs');

// accessing the fields in the _form_fields view
app.use(express.urlencoded({
  extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// root route management
app.use('/todo', todoRouter);

// server listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
