const router = require('express').Router();
const homeController = require('./homeController');
const taskController = require('./taskController');
const authController = require('./authController');
const sessionCheck = require('../middlewares/sessionCheck');

//fire all controllers
router.use('/home', homeController);
router.use('/task', taskController);
router.use('/auth', authController);

router.get('/', sessionCheck, (req, res) => {
    res.render('register');
});

router.get('/login', sessionCheck, (req, res) => {
    res.render('login');
});

module.exports = router;