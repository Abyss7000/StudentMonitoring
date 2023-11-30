const mongoose = require("mongoose");
const meetingSchema = new mongoose.Schema({
  meetingID: {
    type: String,
    required: true,
    unique: true,
  },
  studentID: {
    type: String,
    ref: "User",
    require: true,
  },
  supervisorID: {
    type: Date,
    ref: "User",
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("Meeting", meetingSchema);
