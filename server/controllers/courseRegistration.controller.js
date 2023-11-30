const httpStatus = require("http-status");
const CourseRegistration = require("../models/courseRegistration.model");
module.exports.createCourseRegistration = async (req, res) => {
  try {
    const { userID, courseID } = req.body;
    let registration = await CourseRegistration.findOne({ userID });

    if (!registration) {
      registration = new CourseRegistration({ userID, courseIDs: [courseID] });
    } else {
      if (!registration.courseIDs.includes(courseID)) {
        registration.courseIDs.push(courseID);
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: "Course already registered for this user",
        });
      }
    }

    await registration.save();

    res
      .status(httpStatus.OK)
      .json({ message: "Course registration successful", registration });
  } catch (error) {
    console.error("Error creating course registration:", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.getUserCourses = async (req, res) => {
  try {
    const { userID } = req.params;

    const userRegistration = await CourseRegistration.findOne({
      userID,
    }).populate("courses");

    if (!userRegistration) {
      return res
        .status(404)
        .json({ message: "User not found or not registered for any courses" });
    }

    res.json({ courses: userRegistration });
  } catch (error) {
    console.error("Error getting user courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
