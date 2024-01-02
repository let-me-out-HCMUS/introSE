const express = require("express");

const router = express.Router();
const clubController = require("../controllers/clubController");

router
  .route("/")
  .get(clubController.getAllClubs)
  .post(clubController.uploadImage, clubController.createClub);
router
  .route("/:id")
  .get(clubController.getClub)
  .put(clubController.updateClub)
  .delete(clubController.deleteClub);

module.exports = router;
