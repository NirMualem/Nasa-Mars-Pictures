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
  let email = req.body.email;
  res.render('register',  () => {
    const regexEmail = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    if(email === '' || req.body.first_name === '' || req.body.family_name === ''
        || email.match(regexEmail))
    {
      res.status(404).send(`not valid request`);
    }
    else
      return res.redirect("/password");
  });
});


router.get('/password', function(req, res, next) {
  res.render('password', { title: 'Express' });
});

router.post('/password', function(req, res, next) {
  console.log(req.body);

  res.render('password',  () => {
    if(req.body.confirm_pass === '' || req.body.password === '' || req.body.password !== req.body.confirm_pass)
    {
      //res.status(404).send(`not valid request`);
    }
    //else
      return res.redirect("/nasa");
  });
});

router.get('/nasa', function(req, res, next) {
  res.render('nasa', { title: 'Express' });
});




module.exports = router;
