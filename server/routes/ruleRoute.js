const express = require("express");

const router = express.Router();
const ruleController = require("../controllers/ruleController");

router.route("/").get(ruleController.getRule).post(ruleController.createRule);

module.exports = router;
