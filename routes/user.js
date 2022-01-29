const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const auth = require("../auth");

// Check if username exists
router.post("/checkUsername", (req, res, next) => {
    return User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(result => {
            res.status(200).json(true);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Register a user
router.post("/register", (req, res, next) => {
    let { username, password } = req.body;
    password = bcrypt.hashSync(password, 10)
    return User.findOne({
        where:{
            username: username
        }
    })
        .then(result => {
            if(result === null){
                return User.create({
                    username,
                    password
                })
                    .then(user => res.status(201).json(true))
                    .catch(err => res.status(400).json(err));
            }
            else{
                res.status(200).json(false);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login
router.post("/login", (req, res, next) => {
    return User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(result => {
            if(result === null){
                res.status(200).json(false);
            }
            else{
                const isPasswordCorrect = bcrypt.compareSync(req.body.username, result.password);
                if(isPasswordCorrect){
                    res.status(200).json({token: auth.createAccessToken(result.dataValues)});
                }
                else{
                    res.status(200).json(false);
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(false);
        });
});


module.exports = router;