const Player = require("../models/Player");
const Club = require("../models/Club");
const catchAsync = require("../utils/catchAsync");

exports.getAllPlayers = catchAsync(async (req, res, next) => {
  const players = await Player.find().populate("Club");

  res.status(200).json({
    status: "success",
    data: {
      players,
    },
  });
});

exports.getAPlayer = catchAsync(async (req, res, next) => {
  const player = await Player.findById(req.params.id).populate("Club");
  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
});

exports.createPlayer = catchAsync(async (req, res, next) => {
  // Example request body:
  /*   
  {
    "name":"Cristiano Ronaldo",
    "type":"Ngoài nước",
    "clubName":"Manchester United",
    "shirtNum":7,
    "totalGoal":0
} */
  const club = await Club.findOne({ clubName: req.body.clubName });
  if (!club) {
    return res.status(404).json({
      status: "fail",
      message: "Club does not exist",
    });
  }
  req.body.club = club._id;
  const player = await Player.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      player,
    },
  });
});

exports.updatePlayer = catchAsync(async (req, res, next) => {
  const player = Player.findOne(req.body.id);
  if (!player) {
    return res.status(404).json({
      status: "fail",
      message: "Player does not exist",
    });
  }
  const club = await Club.findOne({ clubName: req.body.clubName });
  if (!club) {
    return res.status(404).json({
      status: "fail",
      message: "Club does not exist",
    });
  }
  req.body.club = club._id;
  player.name = req.body.name;
  player.type = req.body.type;
  player.club = req.body.club;
  player.shirtNum = req.body.shirtNum;
  player.totalGoal = req.body.totalGoal;
  await player.save();
  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
});