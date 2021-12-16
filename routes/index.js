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
  console.log(req.body);
  res.render('register',  () => {
    if(req.body.valid)
    {
      res.render('register');
    }
    else
    {

    }
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(req.body.email === '' || req.body.first_name === '' || req.body.family_name === ''
        || req.body.email.match(regexEmail))
    {
      res.status(302);
    }
    else
      return res.redirect("/password");
  });
});


router.get('/password', function(req, res, next) {
  res.render('password', { title: 'Express' });
});

module.exports = router;
