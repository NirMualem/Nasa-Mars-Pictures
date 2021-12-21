const express = require('express');
const router = express.Router();
const Cookies = require('cookies');
const keys = ['keyboard cat'];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
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
      const cookies = new Cookies(req, res, { keys: keys });
      cookies.set('passRegister', true , { signed: false});
      cookies.set('email', req.body.email, { signed: false});
      cookies.set('first_name', req.body.first_name, { signed: false});
      cookies.set('family_name', req.body.family_name, { signed: false});
      cookies.set('startClock', new Date().toISOString(), { signed: false, maxAge: 10*1000  });
      return res.redirect("password");
    }
  });
});

router.get('/password', function(req, res, next) {
  if(req.cookies["passRegister"] !== "true")
    return res.redirect("register");
  res.render('password', { data:req.body , title: 'Express' });
});

router.post('/password', function(req, res, next) {
  const cookies = new Cookies(req, res, { keys: keys });
  cookies.set('passRegister', false , { signed: false});
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
      return res.redirect("/");
    }
  });
});

router.get('/nasa', function(req, res, next) {
  res.render('nasa', { title: 'Express' });
});




module.exports = router;
