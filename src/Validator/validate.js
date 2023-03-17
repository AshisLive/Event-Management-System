const mongoose = require('mongoose')

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

module.exports = { checkforbody, validDetail }