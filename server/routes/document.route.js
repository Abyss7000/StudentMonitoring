const { createDocument } = require("../controllers/document.controller");

const documentRouter = require("express").Router();

documentRouter.post("/create-document", createDocument);

module.exports = documentRouter;
