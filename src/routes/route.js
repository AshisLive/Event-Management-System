const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logOutUser} = require('../Controllers/userController');
const {createEvent, showEventInvite, showEventList, getEventById} = require('../Controllers/eventController');
const {activityToken, emailValidator} = require('../Middleware/loginmiddleware');

//User
router.post('/user/createUser', emailValidator ,registerUser);
router.post('/user/login', emailValidator ,loginUser);
router.post('/user/logout', emailValidator ,loginUser);

//Event
router.post('/event/createEvent', createEvent);
router.get('/event/showEventInvite', showEventInvite);
router.get('/event/showEventList', showEventList);
router.get('/event/getEventById', getEventById);

module.exports = router;