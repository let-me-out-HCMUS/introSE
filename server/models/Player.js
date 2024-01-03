const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Trong nước", "Ngoài nước"],
    required: true,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  shirtNum: {
    type: Number,
    required: true,
  },
  totalGoal: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
    required: true,
  },
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
