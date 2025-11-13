var express = require('express');
var router = express.Router();

/* GET books home page. */
router.get('/', function (req, res, next) {
  res.render('books', { title: "Bertie's Books" });
});

router.get('/list', function (req, res, next) {
  let sqlquery = 'SELECT * FROM books'; // query database to get all the books

  // execute sql query
  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result);
  });
});

module.exports = router;
