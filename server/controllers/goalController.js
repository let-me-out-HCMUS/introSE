const Goal = require("../models/Goal");
const Player = require("../models/Player");
const Match = require("../models/Match");
const Club = require("../models/Club");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeature");
// Get all goals
exports.getAllGoals = catchAsync(async (req, res, next) => {
  // Build query
  const features = new APIFeatures(Goal.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const goals = await features.query;
  res.status(200).json({
    status: "success",
    data: {
      goals,
    },
  });
});

// Get a goal
exports.getAGoal = catchAsync(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id)
    .populate("player")
    .populate("match");
  res.status(200).json({
    status: "success",
    data: {
      goal,
    },
  });
});

// Create a goal
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
      message: "Match does not exist",
    });
  }
  // Find player
  const player = await Player.findOne({ name: req.body.player });
  if (!player) {
    return res.status(404).json({
      status: "fail",
      message: "Player does not exist",
    });
  }

  // Create goal
  const goadObj = {
    match: match._id,
    player: player._id,
    time: req.body.time,
    goalType: req.body.goalType,
  };

  const goal = await Goal.create(goadObj);

  // Update match point
  let firstClubPoint = Number(match.result.split("-")[0]);
  let secondClubPoint = Number(match.result.split("-")[1]);
  if (player.club.toString() === firstClub._id.toString()) {
    if (!goal.isOwnGoal) firstClubPoint += 1;
    else secondClubPoint += 1;
  } else if (player.club.toString() === secondClub._id.toString()) {
    if (!goal.isOwnGoal) secondClubPoint += 1;
    else firstClubPoint += 1;
  }
  match.result = `${firstClubPoint}-${secondClubPoint}`;
  await match.save();

  res.status(201).json({
    status: "success",
    data: {
      goal,
    },
  });
});

// Update a goal
exports.updateGoal = catchAsync(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    return res.status(404).json({
      status: "fail",
      message: "Goal does not exist",
    });
  }
  goal.time = req.body.time;
  goal.goalType = req.body.goalType;
  await goal.save();
  res.status(200).json({
    status: "success",
    data: {
      goal,
    },
  });
});

exports.deleteGoal = catchAsync(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id).populate("player");
  if (!goal) {
    return res.status(404).json({
      status: "fail",
      message: "Goal does not exist",
    });
  }
  // Update match result
  const match = await Match.findById(goal.match);
  let firstClubPoint = Number(match.result.split("-")[0]);
  let secondClubPoint = Number(match.result.split("-")[1]);
  if (goal.player.club.toString() === match.firstClub.toString()) {
    if (!goal.isOwnGoal) firstClubPoint -= 1;
    else secondClubPoint -= 1;
  } else if (goal.player.club.toString() === match.secondClub.toString()) {
    if (!goal.isOwnGoal) secondClubPoint -= 1;
    else firstClubPoint -= 1;
  }
  match.result = `${firstClubPoint}-${secondClubPoint}`;
  match.save();
  await Goal.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
