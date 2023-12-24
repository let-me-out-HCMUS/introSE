const express = require("express");

const router = express.Router();
const banThangController = require("../controllers/BanThangController");

router
  .route("/")
  .get(banThangController.getAllGoals)
  .post(banThangController.createGoal);
router.route("/:id").get(banThangController.getAGoal);

module.exports = router;
