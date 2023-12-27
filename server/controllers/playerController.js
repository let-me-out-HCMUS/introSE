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
      message: "Cau lac bo khong ton tai",
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
