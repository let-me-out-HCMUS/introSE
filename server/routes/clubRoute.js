const express = require("express");

const router = express.Router();
const clubController = require("../controllers/clubController");

router
  .route("/")
  .get(clubController.getAllClubs)
  .post(clubController.createClub);
router
  .route("/:id")
  .get(clubController.getClub)
  .put(clubController.updateMatch);

module.exports = router;
