const httpStatus = require("http-status");
const { Department } = require("../models/department.model");

module.exports.createDepartment = async (req, res) => {
  try {
    const { ...departmentData } = req.body;
    const { departmentID } = departmentData;
    const existingDepartment = await Department.findOne({ departmentID });
    if (existingDepartment) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Department is already added" });
    }
    const department = new Department(departmentData);
    await department.save();
    res
      .status(httpStatus.OK)
      .json({ department, message: "department added successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
