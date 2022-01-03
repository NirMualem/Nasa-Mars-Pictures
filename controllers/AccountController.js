const express = require('express');
const router = express.Router();
const Cookies = require('cookies');
const keys = ['keyboard cat'];
const db = require('../models');

exports.getLogin = (req, res, next) => {
  res.render('login',{ errorMessage:'' });
};

exports.PostLogin = (req, res, next) => {
  db.Account.findOne({
    where:{mail:req.body.email.toLowerCase(),pass:req.body.password },
  })
      .then(account => {
        if (account) {
          res.render('nasa', {title: 'Express'});
        }
        else
        {
          res.render("login", {errorMessage: ' The email address or password you entered isn\'t match to an account.\n'});
        }
      })
      .catch((err) => {
        return res.status(400).send(err)
      })
};

exports.getRegister = (req, res, next) => {
  res.render('register', { errorMessage:'' });
};

exports.postRegister = (req, res, next) => {
  let email = req.body.email.toLowerCase();
  res.render('register',  () => {
    const regexEmail = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    if(email === '' || req.body.first_name === '' || req.body.family_name === ''
        || email.match(regexEmail))
    {
      res.status(404).send(`not valid request`);
    }
    else{
      db.Account.findOne({
        where:{mail:req.body.email.toLowerCase()}
      })
          .then(account => {
            if(account)
              res.render('register', { errorMessage:'email already register' });
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
          })
          .catch((err) => {
            return res.status(400).send(err)
          })
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
        first_name: req.cookies["first_name"] ,
        last_name: req.cookies["family_name"],
        mail: req.cookies["email"],
        pass:req.body.password
    })
      return res.redirect("/");
    }
  });
};


