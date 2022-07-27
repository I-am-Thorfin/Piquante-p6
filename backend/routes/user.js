const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const maxTry = require("../middleware/limiter")

router.post('/signup', userCtrl.signup); 
router.post('/login', maxTry.limiter, userCtrl.login);

module.exports = router;