const Match = require("../models/Match");
const Club = require("../models/Club");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeature");

// Get all matches
exports.getAllMatches = catchAsync(async (req, res, next) => {
  // Build query
  const features = new APIFeatures(Match.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate()
    .fromNow();
  const matches = await features.query
    .populate("firstClub")
    .populate("secondClub");

  res.status(200).json({
    status: "success",
    data: {
      matches,
    },
  });
});

// Get a match
exports.getMatch = catchAsync(async (req, res, next) => {
  const match = await Match.findById(req.params.id)
    .populate("firstClub")
    .populate("secondClub");

  res.status(200).json({
    status: "success",
    data: {
      match,
    },
  });
});

// Create a match
exports.createMatch = catchAsync(async (req, res, next) => {
  // Example request body:
  /*   {
    "firstClub":"Manchester United",
    "secondClub":"Real Madrid",
    "time":"03/03/2024",
    "stadium":"Cộng Hoà"
} */
  const firstClub = await Club.findOne({ clubName: req.body.firstClub });
  const secondClub = await Club.findOne({ clubName: req.body.secondClub });
  if (!firstClub || !secondClub) {
    return res.status(404).json({
      status: "fail",
      message: "Club does not exist",
    });
  }
  req.body.firstClub = firstClub._id;
  req.body.secondClub = secondClub._id;
  const match = await Match.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      match,
    },
  });
});

// Update a match
exports.updateMatch = catchAsync(async (req, res, next) => {
  const match = await Match.findOne(req.body.id)
    .populate("firstClub")
    .populate("secondClub");
  if (!match) {
    return res.status(404).json({
      status: "fail",
      message: "Match does not exist",
    });
  }
  match.firstClub = req.body.firstClub;
  match.secondClub = req.body.secondClub;
  match.time = req.body.time;
  match.stadium = req.body.stadium;
  await match.save();
  res.status(200).json({
    status: "success",
    data: {
      match,
    },
  });
});

exports.deleteMatch = catchAsync(async (req, res, next) => {
  // delete all match
  await Match.deleteMany({});
  res.status(204).json({
    status: "success",
    data: null,
  });
});
