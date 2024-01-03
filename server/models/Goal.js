const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  goalType: {
    type: String,
    enum: ["A", "B", "C"],
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
    default: false,
  },
});

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;
