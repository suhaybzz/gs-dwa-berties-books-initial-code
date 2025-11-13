var express = require('express');
var router = express.Router();

// Books home page
router.get('/', function (req, res, next) {
  res.render('books', { title: "Bertie's Books" });
});

// List all books (HTML)
router.get('/list', function (req, res, next) {
  let sqlquery = 'SELECT * FROM books';

  db.query(sqlquery, (err, result) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: result });
  });
});

// Show Add Book form
router.get('/addbook', function (req, res, next) {
  res.render('addbook.ejs');
});

// Handle Add Book submission
router.post('/bookadded', function (req, res, next) {
  let sqlquery = 'INSERT INTO books (name, price) VALUES (?, ?)';
  let newrecord = [req.body.name, req.body.price];

  db.query(sqlquery, newrecord, (err, result) => {
    if (err) return next(err);
    res.send(
      `This book is added to database, name: ${req.body.name}, price ${req.body.price}`
    );
  });
});

// Bargain books page (price < 20)
router.get('/bargains', function (req, res, next) {
  let sqlquery = 'SELECT * FROM books WHERE price < 20';

  db.query(sqlquery, (err, result) => {
    if (err) return next(err);
    // pass as "bargains" to match bargains.ejs
    res.render('bargains.ejs', { bargains: result });
  });
});

module.exports = router;
