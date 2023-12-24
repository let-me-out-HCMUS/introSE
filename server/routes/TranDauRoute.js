const express = require("express");

const router = express.Router();
const tranDauController = require("../controllers/TrauDauController");

router
  .route("/")
  .get(tranDauController.getAllMatches)
  .post(tranDauController.createMatch);
router.route("/:id").get(tranDauController.getMatch);

module.exports = router;
