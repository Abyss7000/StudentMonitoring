const {
  createProgressUpdate,
} = require("../controllers/progressUpdate.controler");

const progressUpdateRouter = require("express").Router();

progressUpdateRouter.post("/create-progress-update", createProgressUpdate);

module.exports = progressUpdateRouter;
