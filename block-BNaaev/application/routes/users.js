var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('registrationForm');
});

router.post('/register', (req, res, next) => {
  console.log(req.body);
  User.create(req.body, (err, user) => {
    console.log(err, user);
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
