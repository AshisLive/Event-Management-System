const userModel = require("../Models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkforbody, validDetail } = require("../Validator/validate");

const registerUser = async (req, res) => {
  try {
    let payloadBody = req.body;

    if (!checkforbody(payloadBody)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide user details" });
    }

    let { fname, lname, gender, email, password } = payloadBody;

    if (!validDetail(fname)) {
      return res
        .status(400)
        .send({ status: false, message: "First name is required" });
    }

    if (!validDetail(lname)) {
      return res
        .status(400)
        .send({ status: false, message: "Last name is required" });
    }

    if (!validDetail(gender)) {
      return res
        .status(400)
        .send({ status: false, message: "Gender is required" });
    }

    const isEmailAlreadyUsed = await userModel.findOne({ email });

    if (isEmailAlreadyUsed) {
      return res.status(400).send({
        status: false,
        message: `${email} email address is already registered`,
      });
    }

    if (!validDetail(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }

    const hashPassword = async (password, saltRounds = 2) => {
      return await bcrypt.hash(password, saltRounds);
    };

    password = await hashPassword(password);

    const userdetails = { fname, lname, gender, email, password };
    const userData = await userModel.create(userdetails);
    return res
      .status(201)
      .send({ status: true, msg: "successfully created", data: userData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const requestBody = req.body;
    if (!checkforbody(requestBody)) {
      res
        .status(400)
        .send({
          status: false,
          message: "Invalid request parameters. Please provide login details",
        });
      return;
    }
    const { email, password } = requestBody;
    if (!validDetail(email)) {
      res.status(400).send({ status: false, message: `Email is required` });
      return;
    }

    if (!validDetail(password)) {
      res.status(400).send({ status: false, message: `Password is required` });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(401)
        .send({ status: false, message: `Invalid login credentials` });
      return;
    }
    const passwordFromDB = user.password;
    const isValidPass = bcrypt.compareSync(password, passwordFromDB);
    if (!isValidPass) {
      res
        .status(401)
        .send({
          status: false,
          message: `Invalid login credentials of password`,
        });
      return;
    }

    let userId = user._id;
    let payload = {
      userId: user._id,
      iat: Math.floor(Date.now() / 1000), //[seconds]	The iat (issued at) identifies the time at which the JWT was issued. [Date.now() / 1000 => means it will give time that is in seconds(for January 1, 1970)] (abhi ka time de gha jab bhi yhe hit hugha)
      exp: Math.floor(Date.now() / 1000) + 100 * 60 * 60, //The exp (expiration time) identifies the expiration time on or after which the token MUST NOT be accepted for processing.   (abhi ke time se 10 ganta tak jalee gha ) Date.now() / 1000=> seconds + 60x60min i.e 1hr and x10 gives 10hrs.
    };

    let token = jwt.sign(payload, "user123");

    res.header("Authorization", token);
    res
      .status(200)
      .send({
        status: true,
        message: `User logged in successfully`,
        data: { userId, token },
      });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const logOutUser = async (req, res) => {
  try {
    try {
      const tokenUserId = req.userId;
      const token = await jwt.sign(
        {
          userId: tokenUserId,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 1, //new token generate with 1sec exp time
        },
        "user123"
      );

      res.header("Authorization", token);
      res.status(200).send({ status: true, message: `user logOut` });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const changeUserPassword = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!checkforbody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide details",
      });
      return;
    }

    let { email, password, newPassword } = requestBody;

    if (!validDetail(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }

    const user = await userModel.findOne({ email });
    const comparePassword = await encrypt.comparePassword(
      password,
      user.password
    );

    if (!comparePassword) {
      res.status(401).send({
        status: false,
        message: `Invalid user credentials, Can't change password `,
      });
      return;
    }

    if (!validDetail(newPassword)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }

    const hashPassword = async (newPassword, saltRounds = 2) => {
      return await bcrypt.hash(newPassword, saltRounds);
    };

    newPassword = await hashPassword(newPassword);

    const changePassword = await userModel.findOneAndUpdate(
      { email: email },
      { password: newPassword }
    );
    res
      .status(200)
      .send({ status: true, message: `changed user password successfully` });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, logOutUser, changeUserPassword };