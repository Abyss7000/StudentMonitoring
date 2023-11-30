const { createMeeting } = require("../controllers/meeting.controller");

const meetingRouter = require("express").Router();

meetingRouter.post("/create-meeting", createMeeting);

module.exports = meetingRouter;
