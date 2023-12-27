const express = require("express");

const router = express.Router();
const playerController = require("../controllers/playerController");

router
  .route("/")
  .get(playerController.getAllPlayers)
  .post(playerController.createPlayer);
router.route("/:id").get(playerController.getAPlayer);

module.exports = router;
