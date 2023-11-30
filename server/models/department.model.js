const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema(
  {
    departmentID: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports.Department = mongoose.model(
  "Department",
  departmentSchema,
  "Department"
);
