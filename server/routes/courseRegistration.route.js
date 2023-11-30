const { ENUM_USER_ROLE } = require("../constant/constant");
const {
  createCourseRegistration,
  getUserCourses,
} = require("../controllers/courseRegistration.controller");
const { authenticateAndAuthorize } = require("../middleware/authMiddleware");

const courseRegistrationRouter = require("express").Router();

courseRegistrationRouter.post(
  "/registration",
  authenticateAndAuthorize([
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPERVISOR,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ]),
  createCourseRegistration
);
courseRegistrationRouter.get(
  "/get-courses/:userID",
  authenticateAndAuthorize([
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.SUPERVISOR,
  ]),
  getUserCourses
);

module.exports = courseRegistrationRouter;
