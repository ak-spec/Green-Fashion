const express = require("express");
const router = express.Router();

const getResponse = require("../controllers/chatController");

router.route("/").get(getResponse);

module.exports = router;