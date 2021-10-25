// This manages the root route

//express settings
const express = require('express');
const router = express.Router();

// GET request for the root route
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;