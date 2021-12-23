const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Cookies = require('cookies');
const keys = ['keyboard cat'];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{ errorMessage:'' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { errorMessage:'' });
});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  let email = req.body.email.toLowerCase();
  res.render('register',  () => {
    const regexEmail = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    if(email === '' || req.body.first_name === '' || req.body.family_name === ''
        || email.match(regexEmail))
    {
      res.status(404).send(`not valid request`);
    }
    else if(User.fetchAll().find(user => user.email === email))
    {
      res.render('register', { errorMessage:'email already register' });
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
      let newUser = new User(req.cookies["email"],req.cookies["first_name"],req.cookies["family_name"] , req.body.password);
      newUser.save();
      return res.redirect("/");
    }
  });
});

router.post('/', function(req, res, next) {
  let checkUser = User.fetchAll().find(user => user.email === req.body.email.toLowerCase());
  if(checkUser && checkUser.password === req.body.password) {
    res.render('nasa', {title: 'Express'});
  }
  res.render("login", { errorMessage:' The email address or password you entered isn\'t match to an account.\n' });
});

router.get('/nasa', function(req, res, next) {
  res.render('nasa', { title: 'Express' });
});

module.exports = router;
