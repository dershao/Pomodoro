const router = require("express").Router();
const Task = require("../models/Task");
const authCheck = require("../middlewares/authCheck");
const redisClient = require("../config/redis-client");

//get all data for tasks
router.get("/", authCheck, (req, res) => {
    Task.find({userId: req.session.userId || req.session.passport.user}, (err, data) => {
        if (err) throw err;
        if (data === null) {
            console.info("User has no tasks");
            return;
        }
        else {
            res.json(data);
        }
    });
});

//get all data on specific task
router.get("/data/:item", authCheck, (req, res) => {
    Task.findOne({"item": req.params.item}, (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        if (data == null) {
            res.status(404).json({status: 200, message: `No task found: ${req.params.item}`});
            return;
        }
        else {
            res.status(200).json(data);
        }
    });
});

// update a task's complete counter after successful completion
router.put("/:item", authCheck, (req, res) => {
    const sessionId = req.session.user  || req.user.googleId;

    Task.findOneAndUpdate({item: req.params.item, userId: req.session.userId || req.session.passport.user}, {$inc: {complete: 1} }, {new: true}, (err, data) => {
        if (err) {
            res.status(500).json({status: 500, message: "Something went wrong when updating the database"});
            console.log("Something went wrong when updating database");
        }
        else {
            redisClient.hdel(sessionId, req.params.item);
            res.json(data);
        }
    });
});

router.delete("/:item", authCheck, (req, res) => {
    Task.find({item: req.params.item.replace(/\-/g, " "), userId: req.session.userId || req.session.passport.user})
        .remove(function(err, data) {
            if (err) throw err;
            res.status(200).json({status: 200, message: `Task '${req.params.item}' deleted successfully`});
        });
});

router.post("/pause", authCheck, (req, res) => {
    const sessionId = req.session.user || req.user.googleId;
    const task = req.body.currentTask;
    const timeRemaining = req.body.timeRemaining;

    if (!task || !timeRemaining) {
        console.error("Missing one or more parameters. task: " + task + " timeRemaining: " + timeRemaining);
        res.status(400).end();
    }

    redisClient.hset(sessionId, task, timeRemaining);

    res.status(200).end();
});

module.exports = router;