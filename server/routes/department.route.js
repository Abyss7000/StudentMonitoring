const { ENUM_USER_ROLE } = require("../constant/constant");
const { createDepartment } = require("../controllers/department.controller");
const { authenticateAndAuthorize } = require("../middleware/authMiddleware");

const departmentRouter = require("express").Router();

departmentRouter.post(
  "/add-department",
  authenticateAndAuthorize([
    ENUM_USER_ROLE.SUPERVISOR,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ]),
  createDepartment
);

module.exports = departmentRouter;
