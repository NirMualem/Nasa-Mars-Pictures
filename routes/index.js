const path = require('path');

const express = require('express');

const AccountController = require('../controllers/AccountController');

const router = express.Router();

// / ROUTE => GET
router.get('/', AccountController.getLogin);

//  / ROUTE  => POST
router.post('/', AccountController.PostLogin);

// /register ROUTE => GET
router.get('/register', AccountController.getRegister) ;

// /register ROUTE => POST
router.post('/register', AccountController.postRegister);

// /registerCheck ROUTE => GET
router.get('/registerCheck/:email', AccountController.getRegisterCheck);
// /password ROUTE => GET
router.get('/password', AccountController.getPassword) ;

// /password ROUTE => POST
router.post('/password', AccountController.postPassword);

router.get('/logout',AccountController.getLogout);

router.get('/nasa', function(req, res, next) {
  if (!req.session.auth) {
    return res.redirect('/');
  }
  res.render('nasa', { name:req.session.name, session: req.session});
  next();
  window.location.reload();
});

module.exports = router;