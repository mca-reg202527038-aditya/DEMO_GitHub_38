const mongoose = require("mongoose");
const connecttoDB = function () {
  mongoose.connect(process.env.MONGO).then(function () {
    console.log("Mongodb is connected");
  });
};

module.exports = connecttoDB;
