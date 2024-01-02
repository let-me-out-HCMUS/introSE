const express = require("express");

const router = express.Router();
const playerController = require("../controllers/playerController");

router
  .route("/")
  .get(playerController.getAllPlayers)
  .post(playerController.uploadImage, playerController.createPlayer);
router
  .route("/:id")
  .get(playerController.getAPlayer)
  .put(playerController.updatePlayer)
  .delete(playerController.deletePlayer);
module.exports = router;
