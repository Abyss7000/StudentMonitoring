const httpStatus = require("http-status");
const documentsModel = require("../models/documents.model");

module.exports.createDocument = async (req, res) => {
  const { ...documentData } = req.body;
  try {
    const document = new documentsModel(documentData);
    await document.save();
    res
      .status(httpStatus.OK)
      .json({ document, message: "document added successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
