var express = require('express');
var router = express.Router();
// var app = express();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('allusers', { title: 'All Users' });
});
router.get('/new', function(req, res) {
  res.render('new', { title: 'New User' });
});
router.get('/edit', function(req, res) {
  res.render('edit', { title: 'Edit User' });
});


module.exports = router;
