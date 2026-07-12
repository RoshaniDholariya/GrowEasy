const express = require("express");

const router = express.Router();

const uploadController = require("../controllers/uploadController");

router.post("/upload", uploadController.uploadCSV);

module.exports = router;