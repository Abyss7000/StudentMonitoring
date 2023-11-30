const { ENUM_USER_ROLE } = require("../constant/constant");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  changeUserRole,
  getAllSupervisor,
} = require("../controllers/user.controller");
const { authenticateAndAuthorize } = require("../middleware/authMiddleware");

const userRouter = require("express").Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get(
  "/all-users",
  // authenticateAndAuthorize([
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.SUPERVISOR,
  //   ENUM_USER_ROLE.STUDENT,
  // ]),
  getAllUsers
);
userRouter.get(
  "/supervisors",
  // authenticateAndAuthorize([
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.SUPERVISOR,
  //   ENUM_USER_ROLE.STUDENT,
  // ]),
  getAllSupervisor
);
userRouter.put(
  "/change-role/:userID",
  // authenticateAndAuthorize([
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.SUPERVISOR,
  // ]),
  changeUserRole
);
userRouter.delete(
  "/delete-user/:id",
  authenticateAndAuthorize([ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERVISOR]),
  deleteUser
);

module.exports = userRouter;
