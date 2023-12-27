const express = require("express");

const router = express.Router();
const goalController = require("../controllers/goalController");

router
  .route("/")
  .get(goalController.getAllGoals)
  .post(goalController.createGoal);
router.route("/:id").get(goalController.getAGoal);

module.exports = router;
