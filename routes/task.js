const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../auth");

// Add a task
router.post("/", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);
    const userId = userData.id;
    const { name, description } = req.body;
    return Task.create({
        name,
        description,
        user_id: userId
    })
        .then(result => res.status(200).json(true))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get all tasks
router.get("/all", auth.verify, (req, res) => {
    return Task.findAll()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    })
});

// Get task from specific user
router.get("/", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);
    return Task.findAll({
        where:{
            user_id: userData.id
        }
    })
    .then(tasks => {
        res.status(200).json(tasks);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Get specific task
router.get("/:taskId", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);
    return Task.findOne({
        where:{
            id: req.params.taskId,
            user_id: userData.id
        }
    })
        .then(task => {
            if(task === null){
                res.status(400).json(false);
            }
            else{
                res.status(200).json(task);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Edit a task
router.put("/:taskId", auth.verify, (req, res) => {
    return Task.update({
        name: req.body.name,
        description: req.body.description
    },{
        where: {
            id: req.params.taskId
        }
    })
        .then(task => {
            if(task === null){
                res.status(400).json(false);
            }
            else{
                res.status(201).json(true);
            }
        })
        .catch(err => res.status(500).json(err));
});

// Finish a task
router.patch("/:taskId", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);
    return Task.update({is_finished: 1}, {
        where: {
            id: req.params.taskId,
            user_id: userData.id
        }
    })
        .then(task => {
            if(task[0] === 0){
                res.status(400).json(false);
            }
            else{
                res.status(201).json(true);
            }
        })
        .catch(err => res.status(500).json(err));
    });
    
// Delete a task
router.delete("/:taskId", auth.verify, (req, res) => {
    return Task.destroy({
        where: {
            id: req.params.taskId
        }
    })
    .then(result => {
        if(result[0] === 0){
            res.status(400).json(false);
        }
        else{
            res.status(201).json(true);
        }
    })
    .catch(err => res.status(500).json(err));
})

module.exports = router;