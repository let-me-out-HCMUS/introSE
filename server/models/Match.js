const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  firstClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  secondClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  stadium: { type: String },
  result: { type: String, default: "0-0" },
});

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
