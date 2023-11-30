const {
  createNotification,
} = require("../controllers/notification.controller");

const notificationRouter = require("express").Router();

notificationRouter.post("/create-notification", createNotification);

module.exports = notificationRouter;
