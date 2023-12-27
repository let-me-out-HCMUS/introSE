const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  club: {
    minAge: {
      type: Number,
      required: true,
    },
    maxAge: {
      type: Number,
      required: true,
    },
    maxForeigners: {
      type: Number,
      required: true,
    },
    minPlayers: {
      type: Number,
      required: true,
    },
    maxPlayers: {
      type: Number,
      required: true,
    },
  },
  goal: {
    quantityType: {
      type: Number,
      required: true,
    },
    maxTime: {
      type: Number,
      required: true,
    },
  },
  point: {
    win: {
      type: Number,
      required: true,
    },
    lose: {
      type: Number,
      required: true,
    },
    draw: {
      type: Number,
      required: true,
    },
  },
  piority: {
    type: String,
    required: true,
  },
});

const Rule = mongoose.model("Rule", RuleSchema);

module.exports = Rule;
