var express = require('express');
var router = express.Router();
var Product = require('../models/Product');

router.get('/product/new', (req, res, next) => {
  res.render('productForm');
});

router.post('/product', (req, res, next) => {
  Product.create(req.body, (err, product) => {
    if (err) return next(err);
    res.redirect('/admin/product');
  });
});

router.get('/product', (req, res, next) => {
  Product.find({}, (err, product) => {
    if (err) return next(err);
    res.render('allProduct', { products: product });
  });
});

//edit

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Product.findById(id, (err, product) => {
    if (err) return next(err);
    res.render('singleProduct', { products: product });
  });
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Product.findById(id, (err, product) => {
    if (err) return next(err);
    res.render('updateProduct', { products: product });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, (err, product) => {
    if (err) return next(err);
    res.redirect('/admin/' + id);
  });
});

//delete

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Product.findOneAndDelete(id, (err, product) => {
    if (err) return next(err);
    res.redirect('/admin/product');
  });
});

module.exports = router;
