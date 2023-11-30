const { createSupervisor } = require("../controllers/supervisor.controller");

const supervisorRouter = require("express").Router();

supervisorRouter.post("/create-supervisor", createSupervisor);

module.exports = supervisorRouter;
