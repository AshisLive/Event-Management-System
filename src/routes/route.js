const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logOutUser} = require('../Controllers/userController');
const {} = require('../Controllers/eventController');
const {activityToken, emailValidator} = require('../Middleware/loginmiddleware');

router.post('/user/createUser', emailValidator ,registerUser);
router.post('/user/login', emailValidator ,loginUser);
router.post('/user/logout', emailValidator ,loginUser);

module.exports = router;