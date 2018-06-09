const router = require('express').Router();
const homeController = require('./homeController');
const taskController = require('./taskController');
const userController = require('./userController');
const authController = require('./authController');

//fire all controllers
router.use('/home', homeController);
router.use('/task', taskController);
router.use('/user', userController);
router.use('/auth', authController);

router.get('/', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;