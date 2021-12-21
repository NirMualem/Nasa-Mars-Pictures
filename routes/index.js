const express = require('express');
const router = express.Router();
const Cookies = require('cookies');
const keys = ['keyboard cat'];


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
    {

      return res.redirect("/password");
    }
  });
});


router.get('/password', function(req, res, next) {
  const cookies = new Cookies(req, res, { keys: keys })
  cookies.get('startClock', { signed: true })
  cookies.set('startClock', new Date().toISOString(), { signed: true, maxAge: 10*1000  });
  res.render('password', { title: 'Express' });
});

router.post('/password', function(req, res, next) {
  if (req.cookies["startClock"] == null)
  {
    return res.redirect("/register");
  }
  res.render('password',  () => {
    if(req.body.confirm_pass === '' || req.body.password === '' || req.body.password !== req.body.confirm_pass)
    {
      res.status(404).send(`not valid request`);
    }
    else
    {
      return res.redirect("/nasa");
    }
  });
});

router.get('/nasa', function(req, res, next) {
  res.render('nasa', { title: 'Express' });
});




module.exports = router;
