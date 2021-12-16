var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  console.log({data:req.body});
  //res.render('register',  () =>{console.log(req.body)} );
  return res.redirect("/password");
});


router.get('/password', function(req, res, next) {
  res.render('password', { title: 'Express' });
});

module.exports = router;
