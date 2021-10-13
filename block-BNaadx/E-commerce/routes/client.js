var express = require('express');
var router = express.Router();
var Product = require('../models/Product');

router.get('/product', (req, res, next) => {
  Product.find({}, (err, product) => {
    console.log(err, product);
    if (err) return next(err);
    res.render('clientProduct', { products: product });
  });
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Product.findById(id, (err, product) => {
    if (err) return next(err);
    res.render('clientEachProduct', { products: product });
  });
});

//like and dislike

router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  Product.findByIdAndUpdate(id, { inc: { likes: 1 } }, (err, product) => {
    if (err) return next(err);
    res.redirect('/client' + id);
  });
});

router.get('/:id/dislikes', (req, res, next) => {
  var id = req.params.id;
  Product.findByIdAndUpdate(id, { inc: { likes: -1 } }, (err, product) => {
    if (err) return next(err);
    res.redirect('/client' + id);
  });
});

module.exports = router;
