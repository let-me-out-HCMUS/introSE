const express = require("express");

const router = express.Router();
const ruleController = require("../controllers/ruleController");

router.route("/:id").get(ruleController.getRule).put(ruleController.updateRule);

module.exports = router;
