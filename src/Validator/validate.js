const mongoose = require("mongoose");

const checkforbody = function (value) {
  let check = Object.keys(value).length > 0;
  return check;
};

const validDetail = function (value) {
  if (typeof value === "undefined" || typeof value === "null") {
    return false;
  }
  if (value.trim().length == 0) {
    return false;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    return true;
  }
};

const isValid = function (value) {
  if (typeof value === "undefined" || typeof value === "null") {
    return false;
  } //if undefined or null occur rather than what we are expecting than this particular feild will be false.
  if (value.trim().length == 0) {
    return false;
  } //if user give spaces not any string eg:- "  " =>here this value is empty, only space is there so after trim if it becomes empty than false will be given.
  if (typeof value === "string" && value.trim().length > 0) {
    return true;
  } //to check only string is comming and after trim value should be their than only it will be true.
};

module.exports = { checkforbody, validDetail, isValid };
