const httpStatus = require("http-status");
const thesisReviewsModel = require("../models/thesisReviews.model");

module.exports.sendReviews = async (req, res) => {
  const { ...thesisReviewData } = req.body;
  const { thesisID, comments, studentID } = thesisReviewData;
  try {
    const existingReview = await thesisReviewsModel.findOne({ thesisID });

    if (existingReview) {
      existingReview.comments.push(comments);
      await existingReview.save();

      return res.status(httpStatus.OK).json({
        thesisReview: existingReview,
        message: "Comment added to existing thesis review",
      });
    }

    const newThesisReview = new thesisReviewsModel({
      thesisID,
      comments: [comments],
      studentID,
    });

    await newThesisReview.save();

    res.status(httpStatus.OK).json({
      thesisReview: newThesisReview,
      message: "New thesis review added successfully",
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal server error",
    });
  }
};

module.exports.getReviewsByStudentID = async (req, res) => {
  try {
    const studentID = req.params.studentID;
    const reviews = await thesisReviewsModel
      .find({ studentID })
      .populate("student");

    res.status(httpStatus.OK).json({ reviews });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal server error",
    });
  }
};
