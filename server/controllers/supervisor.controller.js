const httpStatus = require("http-status");
const supervisorsModel = require("../models/supervisors.model");

module.exports.createSupervisor = async (req, res) => {
  const { ...supervisorData } = req.body;
  const { supervisorID } = supervisorData;
  try {
    const existingSupervisor = await supervisorsModel.findOne({ supervisorID });

    if (existingSupervisor) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Supervisor is already registered" });
    }

    const supervisor = new supervisorsModel(supervisorData);
    await supervisor.save();

    res
      .status(httpStatus.OK)
      .json({ supervisor, message: "Supervisor added successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
