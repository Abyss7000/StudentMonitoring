const httpStatus = require("http-status");
const { Course } = require("../models/courses.model");

module.exports.createCourse = async (req, res) => {
  const { ...courseData } = req.body;
  const { courseID } = courseData;
  try {
    const existingCourse = await Course.findOne({ courseID });
    if (existingCourse) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Course already exist" });
    }
    const course = new Course(courseData);
    await course.save();
    res
      .status(httpStatus.OK)
      .json({ course, message: "Course added successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).populate("department");
    console.log(courses);

    res
      .status(httpStatus.OK)
      .json({ courses, message: "all courses retrieved successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports.deleteCourse = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ error: "course not found" });
    }

    res.status(httpStatus.OK).json({ message: "course deleted successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
