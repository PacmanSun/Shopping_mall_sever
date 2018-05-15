var express = require('express');
var router = express.Router();
var dbHelper = require('../dbHelper');

var products = dbHelper.dbGETALL();


// var products = [
//   {
//     id: 1,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品1',
//     subTitle: '描述1',
//   },
//   {
//     id: 2,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品2',
//     subTitle: '描述2',
//   },
//   {
//     id: 3,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品3',
//     subTitle: '描述3',
//   },
//   {
//     id: 4,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品4',
//     subTitle: '描述4',
//   },
//   {
//     id: 5,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品5',
//     subTitle: '描述5',
//   },
//   {
//     id: 6,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品6',
//     subTitle: '描述6',
//   },
//   {
//     id: 7,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品7',
//     subTitle: '描述7',
//   },
//   {
//     id: 8,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品8',
//     subTitle: '描述8',
//   },
//   {
//     id: 9,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品9',
//     subTitle: '描述9',
//   },
//   {
//     id: 10,
//     image: '/public/images/product-image-01.jpg',
//     title: '商品10',
//     subTitle: '描述10',
//   },
// ]

/* GET products listing. */
router.get('/', function (req, res, next) {
  //   res.send('products');
  res.send(JSON.stringify(products));
});

router.post('/', function (req, res, next) {
  products = products.concat(req.body);
  var product = req.body
  dbHelper.dbINSERT(product.id, product.image, product.title, product.subTitle)
  res.send(JSON.stringify(products));
});

router.put('/:id', function (req, res, next) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === parseInt(req.params.id)) {
      products[i] = req.body;
      var product = req.body
      dbHelper.dbUPDATE(req.params.id, product.image, product.title, product.subTitle)
    }
  }
  res.send(JSON.stringify(products));
});

router.delete('/:id', function (req, res, next) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === parseInt(req.params.id)) {
      products.splice(i, 1)
      dbHelper.dbDELETE(req.params.id)
    }
  }
  res.send('delete success!');
});

module.exports = router;
