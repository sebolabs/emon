var express = require('express');
var router = express.Router();

// MySQL -----------------------------------------------------------------

var mysql = require('mysql')

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'emon'
})

db.connect(function(err) {
  if (err) throw err
  console.log('[mysql] connected')
});

// ROUTING ----------------------------------------------------------------

router.get('/', function(req, res) {
  db.query('SELECT * from events ORDER BY id ASC', function(err, resEvents) {
    if (err) throw err
    //console.log(resEvents)
    res.render('index', {
      title: 'Events',
      events: resEvents,
    })
  })
});

router.get('/archive', function(req, res) {
  res.render('archive', {
    title: 'Archive'
  });
});

router.get('/stats', function(req, res) {
  res.render('stats', {
    title: 'Stats'
  });
});

module.exports = router;
