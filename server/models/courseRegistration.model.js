const mongoose = require("mongoose");

const CourseRegistrationSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      ref: "User",
      required: true,
    },
    courseIDs: [
      {
        type: String,
        ref: "Course",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CourseRegistrationSchema.virtual("user", {
  ref: "User",
  localField: "userID",
  foreignField: "userID",
});

CourseRegistrationSchema.virtual("courses", {
  ref: "Course",
  localField: "courseIDs",
  foreignField: "courseID",
});

module.exports = mongoose.model("CourseRegistration", CourseRegistrationSchema);
