const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logOutUser} = require('../Controllers/userController');
const {} = require('../Controllers/eventController');
const {activityToken, emailValidator} = require('../Middleware/loginmiddleware');

router.post('/createUser', emailValidator ,registerUser);
router.post('/loginAPI', emailValidator ,loginUser);

module.exports = router;