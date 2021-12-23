const express = require('express');
const User = require('../models/User');
const router = express.Router();

/* Post api for login */
router.get('/api/login', function(req, res, next) {
    let checkUser = User.fetchAll().find(user => user.email === req.body.email.toLowerCase());
    if(checkUser && checkUser.password === req.body.password) {
        res.json({"find":"true"});
    }
    else
        res.json({"find":"false"});
});
