const express = require("express");

const router = express.Router();
const quyDinhController = require("../controllers/QuyDinhController");

router
  .route("/")
  .get(quyDinhController.getRule)
  .post(quyDinhController.createRule);

module.exports = router;
