const express = require("express");

const router = express.Router();
const doiBongController = require("../controllers/DoiBongController");

router
  .route("/")
  .get(doiBongController.getAllTeams)
  .post(doiBongController.createTeam);
router.route("/:id").get(doiBongController.getTeam);

module.exports = router;
