const httpStatus = require("http-status");
const notificationModel = require("../models/notification.model");

module.exports.createNotification = async (req, res) => {
  try {
    const { ...notificationData } = req.body;
    const notification = new notificationModel(notificationData);
    await notification.save();
    res
      .status(httpStatus.OK)
      .json({ notification, message: "Notification added successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
