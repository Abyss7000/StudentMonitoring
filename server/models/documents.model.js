const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema(
  {
    documentID: {
      type: String,
      unique: true,
      required: true,
    },
    thesisID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thesis",
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    submissionDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Document", documentSchema);
