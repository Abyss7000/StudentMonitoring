const mongoose = require("mongoose");
const thesisReviewSchema = new mongoose.Schema(
  {
    thesisID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thesis",
      require: true,
    },
    studentID: {
      type: String,
      ref: "User",
      required: true,
    },
    reviewDate: {
      type: Date,
      default: Date.now,
      require: true,
    },
    comments: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

thesisReviewSchema.virtual("student", {
  ref: "User",
  localField: "studentID",
  foreignField: "userID",
});

module.exports = mongoose.model("ThesisReview", thesisReviewSchema);
