const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  goalType: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    min: 0,
    max: 96,
    required: true,
  },
  isOwnGoal: {
    type: Boolean,
    default: true,
  },
});

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;
