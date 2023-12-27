const Goal = require("../models/Goal");
const Player = require("../models/Player");
const Match = require("../models/Match");
const Club = require("../models/Club");
const catchAsync = require("../utils/catchAsync");

exports.getAllGoals = catchAsync(async (req, res, next) => {
  const goals = await Goal.find().populate("player").populate("matchId");
  res.status(200).json({
    status: "success",
    data: {
      goals,
    },
  });
});

exports.getAGoal = catchAsync(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id)
    .populate("player")
    .populate("matchId");
  res.status(200).json({
    status: "success",
    data: {
      goal,
    },
  });
});

exports.createGoal = catchAsync(async (req, res, next) => {
  // Example request body:
  /*   {
    "firstClub":"Manchester United",
    "secondClub":"Real Madrid",
    "player":"Cristiano Ronaldo",
    "goalType":"A",
    "time":10
} */

  // Find id of team
  const firstClub = await Club.findOne({ clubName: req.body.firstClub });
  const secondClub = await Club.findOne({ clubName: req.body.secondClub });
  // Find match has 2 teams
  const match = await Match.findOne({
    firstClub: firstClub._id,
    secondClub: secondClub._id,
  });
  if (!match) {
    return res.status(404).json({
      status: "fail",
      message: "Tran dau khong ton tai",
    });
  }
  // Find player
  const player = await Player.findOne({ name: req.body.player });
  if (!player) {
    return res.status(404).json({
      status: "fail",
      message: "Cau thu khong ton tai",
    });
  }

  // Create goal
  const goadObj = {
    matchId: match._id,
    playerId: player._id,
    time: req.body.time,
    goalType: req.body.goalType,
  };

  const goal = await Goal.create(goadObj);
  res.status(201).json({
    status: "success",
    data: {
      goal,
    },
  });
});
