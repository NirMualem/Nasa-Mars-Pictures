const express = require('express');
const router = express.Router();
const Cookies = require('cookies');
const keys = ['keyboard cat'];
const db = require('../models');
const session = require('express-session');
const bodyParser = require("body-parser");

exports.getLogin = (req, res, next) => {
  if (req.session.auth) {
    sessionUpdate(req , res);
  }
  res.render('login',{ errorMessage:'', registerName: req.session.registerName});
};

exports.PostLogin = (req, res, next) => {
  req.session.name = '';
  db.Account.findOne({
    where:{mail:req.body.email.toLowerCase(),pass:req.body.password },
  })
      .then(account => {
        if (account) {
          sessionUpdate(req , res);
          req.session.auth = true;
          req.session.name = account.firstName;
          res.redirect("nasa");
        }
        else
        {
          res.render("login", {errorMessage: 'The email address or password you entered isn\'t match to an account.\n', registerName:""});
        }
      })
      .catch((err) => {
        return res.status(400).send(err)
      })
};

exports.getRegister = (req, res, next) => {
  if (req.session.auth) {
    sessionUpdate(req , res);
  }
  res.render('register', { errorMessage:'' });
};

exports.postRegister = (req, res, next) => {
  let email = req.body.data.email.toLowerCase();
  res.render('register',  () => {
    const regexEmail = "/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/";
    if(email === '' || req.body.data.first_name === '' || req.body.data.family_name === ''
        || email.match(regexEmail))
    {
      res.status(404).send(`not valid request`);
    }
    else{
      const cookies = new Cookies(req, res, { keys: keys });
      cookies.set('passRegister', true , { signed: false});
      cookies.set('email', req.body.data.email, { signed: false});
      cookies.set('first_name', req.body.data.first_name, { signed: false});
      cookies.set('family_name', req.body.data.family_name, { signed: false});
      cookies.set('startClock', new Date().toISOString(), { signed: false, maxAge: 10*1000  });
      return res.redirect("/password");
    }
  });
};
exports.getPassword = (req, res, next) => {
  if(req.cookies["passRegister"] !== "true")
    return res.redirect("register");
  res.render('password', { data:req.body , title: 'Express' });
};

exports.postPassword = (req, res, next) => {
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
      db.Account.create({
        firstName: req.cookies["first_name"] ,
        lastName: req.cookies["family_name"],
        mail: req.cookies["email"],
        pass:req.body.password
      })

      req.session.registerName = req.cookies["first_name"];
      return res.redirect("/");
    }
  });
};

exports.getLogout=(req, res, next) => {
  req.session.auth = false;
  res.redirect("/");
}

const sessionUpdate = (req,res) => {
  if (req.session && req.session.auth === true){
    return res.redirect("nasa");

    //req.session.auth = false;
  } else {
    req.session.auth = false;
    req.session.email = req.body.email;
    req.session.registerName = "";
  }
}