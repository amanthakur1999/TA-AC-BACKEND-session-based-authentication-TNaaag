var express = require('express');
var router = express.Router();
var User = require('../models/User');

//registretion
router.get('/new', (req, res) => {
  res.render('register');
});

router.post('/new', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
});

//login

router.get('/login', (req, res, next) => {
  var error = req.flash('error')[0];
  res.render('login', { error });
});

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'email and password is required');
    return res.redirect('/users/login');
  }

  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'email is not registered');
      return res.redirect('/users/login');
    }
    user.verifyPassword('password', (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'email is not register');
        return res.redirect('/users/login');
      } else {
        console.log(req.session);
        req.session.userId = user.id;
        req.session.isAdmin = user.isAdmin;
        return res.redirect('/');
      }
    });
  });
});

router.get('/logout', (req, res, next) => {
  console.log(req.session);
  req.session.destroy();
  res.clearCookie('connect-sid');
  res.redirect('/users/login');
});
module.exports = router;
