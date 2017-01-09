var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.get('/new', function(req, res) {
  res.render('new', { title: 'Express' });
});


module.exports = router;
