const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  notificationID: {
    type: String,
    required: true,
    unique: true,
  },
  userID: {
    type: String,
    ref: "User",
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
