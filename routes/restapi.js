
const express = require('express');
const db = require('../models');
const RestApiController = require('../controllers/RestApiController');
const AccountController = require("../controllers/AccountController");

const router = express.Router();


router.get('/saveImages/:email',RestApiController.getSaveImagesForUser);

router.post('/addSaveImagesForUser', RestApiController.addSaveImagesForUser);

router.delete('/deleteSaveImagesForUser',RestApiController.deleteSaveImagesForUser);

router.delete('/deleteAllSaveImagesUser', RestApiController.deleteAllSaveImagesUser);

module.exports = router;
