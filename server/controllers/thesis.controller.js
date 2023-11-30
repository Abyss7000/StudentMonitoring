const httpStatus = require("http-status");
const thesisModel = require("../models/thesis.model");

module.exports.createThesis = async (req, res) => {
  const { ...thesisData } = req.body;

  try {
    const thesis = new thesisModel(thesisData);
    await thesis.save();

    res
      .status(httpStatus.OK)
      .json({ thesis, message: "Thesis added successfully" });
  } catch (error) {
    // Return the error message for debugging
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports.getThesisBySupervisor = async (req, res) => {
  const { supervisorID } = req.params;
  try {
    const thesis = await thesisModel
      .find({
        supervisorID,
      })
      .populate("student");

    res
      .status(httpStatus.OK)
      .json({ thesis, message: "Thesis data retrive successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message || "Internal server error" });
  }
};
