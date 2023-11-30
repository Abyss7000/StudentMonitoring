const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courseID: {
      type: String,
      required: true,
      unique: true,
    },
    departmentID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

courseSchema.virtual("department", {
  ref: "Department",
  localField: "departmentID",
  foreignField: "departmentID",
});

module.exports.Course = mongoose.model("Course", courseSchema, "Course");
