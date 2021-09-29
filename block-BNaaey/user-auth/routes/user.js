var express = require('express');
var router = express.Router();
var User = require('../models/register');

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

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    console.log(err, user);
    if (err) return next(err);
    //no user
    if (!user) {
      res.redirect('/users/login');
    }
    //compare password
    user.verifyPassword(password, (err, result) => {
      console.log(err, result);
      if (err) return next(err);
      if (!result) {
        res.redirect('/users/login');
      }
      console.log(err, result);
    });
  });
});

module.exports = router;
