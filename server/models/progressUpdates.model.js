const mongoose = require("mongoose");
const progressUpdateSchema = new mongoose.Schema({
  updateID: {
    type: String,
    required: true,
    unique: true,
  },
  thesisID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thesis",
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("ProgressUpdate", progressUpdateSchema);
