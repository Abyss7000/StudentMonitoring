const mongoose = require("mongoose");
const supervisorSchema = new mongoose.Schema({
  supervisorID: {
    type: String,
    ref: "User",
    required: true,
  },
  department: {
    type: String,
    require: true,
  },
  departmentID: {
    type: String,
    require: true,
    ref: "Department",
  },
});

module.exports = mongoose.model("Supervisor", supervisorSchema);
