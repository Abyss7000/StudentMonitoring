const httpStatus = require("http-status");
const meetingModel = require("../models/meeting.model");

module.exports.createMeeting = async (req, res) => {
  try {
    const { ...meetingData } = req.body;

    const meeting = new meetingModel(meetingData);

    await meeting.save();
    res
      .status(httpStatus.OK)
      .json({ meeting, message: "meeting added successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
