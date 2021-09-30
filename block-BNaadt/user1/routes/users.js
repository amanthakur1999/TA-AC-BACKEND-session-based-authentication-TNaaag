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
    res.redirect('/users/login');
  });
});

router.get('/login', (req, res, next) => {
  console.log(req.flash('error'));
  //console.log(req.flash('error')[0]);
  var err = req.flash('error');
  console.log(err);
  res.render('login', { err });
});

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', ' Email/Password required');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    console.log(err, user);
    if (err) return next(err);
    //no user
    if (!user) {
      return res.redirect('/users/login');
    }
    //compare password
    user.verifyPassword(password, (err, result) => {
      console.log(err, result);
      if (err) return next(err);
      if (!result) {
        return res.redirect('/users/login');
      }
      if (result) {
        req.session.userId = user.id;
        res.redirect('/');
      }
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/register');
});

module.exports = router;
