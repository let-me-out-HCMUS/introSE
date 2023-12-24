const express = require("express");

const router = express.Router();
const cauThuController = require("../controllers/CauThuController");

router
  .route("/")
  .get(cauThuController.getAllPlayers)
  .post(cauThuController.createPlayer);
router.route("/:id").get(cauThuController.getAPlayer);

module.exports = router;
