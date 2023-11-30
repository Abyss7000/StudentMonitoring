const {
  createCourse,
  getAllCourses,
  deleteCourse,
} = require("../controllers/course.controller");
const { ENUM_USER_ROLE } = require("../constant/constant");
const { authenticateAndAuthorize } = require("../middleware/authMiddleware");

const courseRouter = require("express").Router();

courseRouter.post(
  "/create-course",
  authenticateAndAuthorize([ENUM_USER_ROLE.SUPER_ADMIN]),
  createCourse
);
courseRouter.get(
  "/get-courses",
  authenticateAndAuthorize([
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.SUPERVISOR,
    ENUM_USER_ROLE.STUDENT,
  ]),
  getAllCourses
);
courseRouter.delete(
  "/delete-course",
  authenticateAndAuthorize([ENUM_USER_ROLE.SUPER_ADMIN]),
  deleteCourse
);

module.exports = courseRouter;
