const express = require('express');
const router = express.Router();
const db = require('../models');
const session = require('express-session');


exports.getSaveImagesForUser = (req, res, next) => {
   // if (req.session.auth) {
        db.Images.findAll()
            //where:{email:session.name}

            .then(images => {
                res.status(200).json(images)
            })
            .catch(error => {
                res.status(400).send(error)
            });
    //}
    //else
    //{
     //   res.render('login',{ errorMessage:'' });
    //}
};

exports.addSaveImagesForUser = (req, res, next) => {
   // if (req.session.auth) {

    return db.Images.create({
        imageId: req.body.id,
        earthDate:req.body.earthDate,
        sol: req.body.sol,
        camera: req.body.camera,
        mission: req.body.mission,
        path: req.body.path,
        email: req.body.email
    })
        .then((image) =>  res.render(""))
        .catch((err) => {
            console.log('***There was an error creating a contact', JSON.stringify(image))
            return res.status(400).send(err)
        })
    //}
    //else
    //{
     //   res.render('login',{ errorMessage:'' });
   // }
};

exports.deleteSaveImagesForUser = (req, res, next) => {
  //  if (req.session.auth) {
        db.Images.destroy({where:{email:req.body.email,imageId:req.body.imageId}
        })
            .then((image) => image.destroy({ force: true }))
            .catch((err) => {
                console.log('***Error deleting contact', JSON.stringify(err))
                res.status(400).send(err)
            })
    //}
   // else
   // {
     //   res.render('login',{ errorMessage:'' });
    //}
};

exports.deleteAllSaveImagesUser = (req, res, next) => {
    //if (req.session.auth) {
        return db.Images.destroy({where:{email:req.body.email}
        })
            .then((image) => image.destroy({ force: true }))
            .catch((err) => {
                console.log('***Error deleting contact', JSON.stringify(err))
                res.status(400).send(err)
            })
    //}
    //else
    //{
     //   res.render('login',{ errorMessage:'' });
    //}
};
