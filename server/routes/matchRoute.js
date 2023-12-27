const express = require("express");

const router = express.Router();
const matchController = require("../controllers/matchController");

router
  .route("/")
  .get(matchController.getAllMatches)
  .post(matchController.createMatch);
router.route("/:id").get(matchController.getMatch);

module.exports = router;
