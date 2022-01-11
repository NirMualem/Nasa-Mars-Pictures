const express = require('express');
const router = express.Router();
const db = require('../models');
const session = require('express-session');

exports.getSaveImagesForUser = (req, res, next) => {
    if (req.session.auth) {
        db.Images.findAll({
            where: {email: req.params.email.toLowerCase()}
        })
            .then(images => {
                res.status(200).json(images)
            })
            .catch(error => {
                res.redirect("/");
            });
    }
    else
    {
        res.redirect("/");
    }
};

exports.addSaveImagesForUser = (req, res, next) => {
    if (req.session.auth) {
    return db.Images.create({
        imageId: req.body.imageId,
        earthDate:req.body.earthDate,
        sol: req.body.sol,
        camera: req.body.camera,
        mission: req.body.mission,
        path: req.body.path,
        email: req.body.email
    })
        .then(images => {
            res.status(200).json(images)
        })
        .catch((err) => {
            res.redirect("/");
        })
    }
    else
    {
        res.redirect("/");
    }
};

exports.deleteSaveImagesForUser = (req, res, next) => {
      if (req.session.auth) {
        db.Images.destroy({where:{email:req.body.email,imageId:req.body.imageId}
        })
            .catch((err) => {
                res.redirect("/");
            })
    }
    else
    {
        res.redirect("/");
    }
};

exports.deleteAllSaveImagesUser = (req, res, next) => {

    if (req.session.auth) {
        return db.Images.destroy({where:{email:req.body.email}
        })
            .catch((err) => {
                res.redirect("/");
            })
     }
     else
     {
         res.redirect("/");
     }
};

exports.getRegisterCheck = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    db.Account.findOne({
        where:{mail:req.params.email.toLowerCase()}
    })
        .then(account => {
            if(account)
                res.json({ "exist" : true });
            else
                res.json({ "exist" : false });
        })
        .catch((err) => {
            res.redirect("/register");
        })
}

