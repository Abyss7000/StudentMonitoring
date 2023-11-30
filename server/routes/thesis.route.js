const { ENUM_USER_ROLE } = require("../constant/constant");
const {
  createThesis,
  getThesisBySupervisor,
} = require("../controllers/thesis.controller");
const { authenticateAndAuthorize } = require("../middleware/authMiddleware");

const thesisRouter = require("express").Router();

thesisRouter.post(
  "/create-thesis",
  authenticateAndAuthorize([
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPERVISOR,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ]),
  createThesis
);
thesisRouter.get(
  "/:supervisorID",
  authenticateAndAuthorize([
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPERVISOR,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ]),
  getThesisBySupervisor
);

module.exports = thesisRouter;
