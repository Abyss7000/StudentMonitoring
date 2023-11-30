const httpStatus = require("http-status");
const progressUpdatesModel = require("../models/progressUpdates.model");

module.exports.createProgressUpdate = async (req, res) => {
  try {
    const { ...progressUpdateData } = req.body;
    const progressUpdate = new progressUpdatesModel(progressUpdateData);
    await progressUpdate.save();
    return res
      .status(httpStatus.OK)
      .json({ message: "Successfully created Progress Update" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
