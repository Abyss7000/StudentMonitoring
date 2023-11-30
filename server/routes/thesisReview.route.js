const { ENUM_USER_ROLE } = require("../constant/constant");
const {
  sendReviews,
  getReviewsByStudentID,
} = require("../controllers/thesisReview.controller");
const { authenticateAndAuthorize } = require("../middleware/authMiddleware");

const thesisReviewRoute = require("express").Router();

thesisReviewRoute.post(
  "/send-review",
  authenticateAndAuthorize([
    ENUM_USER_ROLE.SUPERVISOR,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ]),
  sendReviews
);
thesisReviewRoute.get(
  "/:studentID",
  authenticateAndAuthorize([
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPERVISOR,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ]),
  getReviewsByStudentID
);

module.exports = thesisReviewRoute;
