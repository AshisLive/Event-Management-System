const eventModel = require("../Models/eventModel");
const mongoose = require("mongoose");
const { checkforbody, validDetail } = require("../Validator/validate");

const createEvent = async (req, res) => {
  try {
    const requestBody = req.body;
    const { title, description, date, users, createdBy } = requestBody;

    const event = { title, description, date, users, createdBy };
    const eventData = await eventModel.create(event);
    return res
      .status(201)
      .send({ status: true, msg: "successfully created", data: eventData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const showEventInvite = async (req, res) => {
  try {
    let createdBy = req.query.userID;
    const ownEvents = await eventModel.find({ createdBy });
    const invitedIn = await eventModel.find({ users: createdBy });
    const data = { ownEvents, invitedIn };
    return res
      .status(201)
      .send({ status: true, msg: "successfully created", data: data });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const showEventList = async (req, res) => {
  try {
    let createdBy = req.query.userID;
    const ownEvents = await eventModel
      .find({ createdBy })
      .populate({ path: "createdBy", select: { fname: 1, lname: 1, _id: 0 } });
    const invitedIn = await eventModel
      .find({ users: createdBy })
      .populate({ path: "createdBy", select: { fname: 1, lname: 1, _id: 0 } });
    const data = { ownEvents, invitedIn };
    return res
      .status(201)
      .send({ status: true, msg: "successfully created", data: data });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    let eventId = req.query.eventId;
    const eventDetails = await eventModel
      .findById({ _id: eventId })
      .populate({ path: "users", select: { fname: 1, lname: 1, _id: 0 } })
      .populate({ path: "createdBy", select: { fname: 1, lname: 1, _id: 0 } });
    return res
      .status(201)
      .send({ status: true, msg: "successfully created", data: eventDetails });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createEvent, showEventInvite, showEventList, getEventById };
