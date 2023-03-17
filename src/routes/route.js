const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logOutUser, changeUserPassword} = require('../Controllers/userController');
const {createEvent, showEventInvite, showEventList, getEventById, updateEventById} = require('../Controllers/eventController');
const {activityToken, emailValidator} = require('../Middleware/loginmiddleware');

//User
router.post('/user/createUser', emailValidator ,registerUser);
router.post('/user/login', emailValidator ,loginUser);
router.post('/user/logout', activityToken, emailValidator ,logOutUser);
router.put("/changePassword",activityToken, emailValidator , changeUserPassword)

//Event
router.post('/event/createEvent', activityToken , createEvent);
router.get('/event/showEventInvite', activityToken , showEventInvite);
router.get('/event/showEventList', activityToken , showEventList);
router.get('/event/getEventById', activityToken , getEventById);
router.put('/event/updateEvent', activityToken , updateEventById);

module.exports = router;