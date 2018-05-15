var sqlite3 = require('sqlite3').verbose()
// var db = new sqlite3.Database('./shopping_mall_sever.db')

var dbinit = () => {
  var db = new sqlite3.Database('./shopping_mall_sever.db')
  var products = [
    {
      id: 1,
      image: '/public/images/product-image-01.jpg',
      title: '商品1',
      subTitle: '描述1',
    },
    {
      id: 2,
      image: '/public/images/product-image-01.jpg',
      title: '商品2',
      subTitle: '描述2',
    },
    {
      id: 3,
      image: '/public/images/product-image-01.jpg',
      title: '商品3',
      subTitle: '描述3',
    },
    {
      id: 4,
      image: '/public/images/product-image-01.jpg',
      title: '商品4',
      subTitle: '描述4',
    },
    {
      id: 5,
      image: '/public/images/product-image-01.jpg',
      title: '商品5',
      subTitle: '描述5',
    },
    {
      id: 6,
      image: '/public/images/product-image-01.jpg',
      title: '商品6',
      subTitle: '描述6',
    },
    {
      id: 7,
      image: '/public/images/product-image-01.jpg',
      title: '商品7',
      subTitle: '描述7',
    },
    {
      id: 8,
      image: '/public/images/product-image-01.jpg',
      title: '商品8',
      subTitle: '描述8',
    },
    {
      id: 9,
      image: '/public/images/product-image-01.jpg',
      title: '商品9',
      subTitle: '描述9',
    },
    {
      id: 10,
      image: '/public/images/product-image-01.jpg',
      title: '商品10',
      subTitle: '描述10',
    },
  ]
  db.serialize(function () {
    //   db.run('CREATE TABLE products (info TEXT)')
    db.run('DROP TABLE products')
    db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER NOT NULL,image TEXT,title TEXT,subtitle TEXT)')
    var stmt = db.prepare('INSERT INTO products VALUES (?,?,?,?)')

    for (var i = 0; i < products.length; i++) {
      stmt.run(products[i].id, products[i].image, products[i].title, products[i].subTitle)
    }

    stmt.finalize()

    db.each('SELECT rowid AS rowid, image FROM products', function (err, row) {
      console.log(row.rowid + ': ' + row.image)
    })
  })

  db.close()
}

var dbGET = (i) => {
  var db = new sqlite3.Database('./shopping_mall_sever.db')
  var products = []
  db.serialize(function () {
    db.each('SELECT rowid AS rowid, id,image,title,subtitle FROM products LIMIT 5 OFFSET ' + i, function (err, row) {
      // console.log(row.rowid + ': ' + row.image)
      products.push({
        id: row.id,
        image: row.image,
        title: row.title,
        subTitle: row.subtitle
      })
    })
  })
  return products
  db.close()
}

var dbGETALL = () => {
  var db = new sqlite3.Database('./shopping_mall_sever.db')
  var products = [];
  db.serialize(function () {
    db.each('SELECT rowid AS rowid, id,image,title,subtitle FROM products', function (err, row) {
      // console.log(row.rowid + ': ' + row.image)
      products.push({
        id: row.id,
        image: row.image,
        title: row.title,
        subTitle: row.subtitle
      })
    })
  })
  return products
  db.close()
}

var dbINSERT = (id, image, title, subtitle) => {
  var db = new sqlite3.Database('./shopping_mall_sever.db')
  db.serialize(function () {
    var stmt = db.prepare('INSERT INTO products VALUES (?,?,?,?)')
    stmt.run(id, image, title, subtitle)
    stmt.finalize()

    db.each('SELECT rowid AS rowid, image FROM products', function (err, row) {
      // console.log(row.rowid + ': ' + row.image)
    })
  })

  db.close()
}

var dbUPDATE = (id, image, title, subtitle) => {
  var db = new sqlite3.Database('./shopping_mall_sever.db')
  db.serialize(function () {
    var stmt = db.prepare('UPDATE products SET (image,title,subtitle)=(?,?,?) WHERE id=' + id)
    stmt.run(image, title, subtitle)
    stmt.finalize()

    // db.each('SELECT rowid AS rowid, image FROM products', function (err, row) {
    //   // console.log(row.rowid + ': ' + row.image)
    // })
  })

  db.close()
}

var dbDELETE = (id) => {
  var db = new sqlite3.Database('./shopping_mall_sever.db')
  db.serialize(function () {
    db.run('BEGIN TRANSACTION')
    var stmt = db.prepare('DELETE FROM products WHERE id=' + id)
    stmt.run();
    stmt.finalize()
    db.run('COMMIT TRANSACTION')

    console.log('delete success!')
  })

  db.close()
}

module.exports = {
  dbinit: dbinit,
  dbGET: dbGET,
  dbINSERT: dbINSERT,
  dbUPDATE: dbUPDATE,
  dbDELETE: dbDELETE,
  dbGETALL: dbGETALL
}