const mongoose = require("mongoose");
const thesisSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    courseID: {
      type: String,
      ref: "Course",
      required: true,
    },
    studentID: {
      type: String,
      ref: "User",
      required: true,
    },
    supervisorID: {
      type: String,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
      require: true,
    },
    submissionDate: {
      type: Date,
      default: Date.now,
      require: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

thesisSchema.virtual("student", {
  ref: "User",
  localField: "studentID",
  foreignField: "userID",
});
thesisSchema.virtual("supervisor", {
  ref: "User",
  localField: "supervisorID",
  foreignField: "userID",
});
thesisSchema.virtual("course", {
  ref: "Course",
  localField: "courseID",
  foreignField: "courseID",
});

module.exports = mongoose.model("Thesis", thesisSchema);
