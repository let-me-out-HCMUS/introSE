const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
    unique: true,
  },
  won: {
    type: Number,
    default: 0,
  },
  lost: {
    type: Number,
    default: 0,
  },
  drawn: {
    type: Number,
    default: 0,
  },
  gd: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 0,
  },
});

const Club = mongoose.model("Club", ClubSchema);

module.exports = Club;
